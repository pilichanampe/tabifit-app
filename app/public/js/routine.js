function createRoundSteps(series, exerciseList) {
  const pasosVuelta = [];
  for(let i = 0; i < series; i++) {
    for(let j = 0; j < exerciseList.length; j++) {
      if(pasosVuelta.length < series*2) {
        pasosVuelta.push(
          { tipoPaso: 'serie', datos: { id: exerciseList[j]} }
        );
        if(pasosVuelta.length === series*2 - 1) {
          pasosVuelta.push(
            { tipoPaso: 'pausa', datos: { duracion: 15 } }
          );
        } else {
          pasosVuelta.push(
            { tipoPaso: 'pausa', datos: { duracion: 10 } }
          );
        }
      }
    }
  }
  return pasosVuelta;
}

function multiplyRounds(roundsNumb, roundStepsList) {
  const allRounds = [];
  for(let i = 0; i < roundsNumb; i++) {
      for(const step of roundStepsList) {
        allRounds.push(step);
      }
  }
  return allRounds;
}

function createRoutineString(dataRoutine) {
  const year = dataRoutine.fecha.slice(0, 4);
  const month = dataRoutine.fecha.slice(5, 7);
  const day = dataRoutine.fecha.slice(8, 10);
  //Con la forma de abajo comentada fuerzo que todas las fechas se manejen en hora local, pero harcodeado
  //Me parece mejor usar directamente UTC que maneja node y no tener conflictos en los archivos.
  //const hour = "0".concat((dataRoutine.fecha.slice(11, 13) - 3).toString()).slice(-2);
  const hour = dataRoutine.fecha.slice(11, 13);
  const minutes = dataRoutine.fecha.slice(14, 16);
  const seconds = dataRoutine.fecha.slice(17, 19);
  const series = dataRoutine.series.toString().padStart(2, '*');
  const rounds = dataRoutine.vueltas.toString().padStart(2, '*');
  let exercises = "";
  if (dataRoutine.ejercicios) {
    exercises = dataRoutine.ejercicios.toString();
  }
  if (dataRoutine.lista_ejercicios) {
    exercises = dataRoutine.lista_ejercicios.toString();
  }
  return year.concat(month, day, hour, minutes, seconds, series, rounds, exercises);
}

function saveRoutine(routineId) { 
  const saveButton = document.querySelector('#finish-training button-normal#save');
  saveButton.addEventListener('click', async () => {
    const routineGet = await fetch(`/entrenamientos/${routineId}`);
    const dataRoutineGet = await routineGet.json();
    const routineString = createRoutineString(dataRoutineGet);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ routineString })
    }  
    let routinePost = await fetch(`/entrenamientos/${routineId}/exportar`, options);
    
    //Rutina guardada desde el frontend, ya que había inconvenientes con el botón para poder guardarla. De todos modos, si se le pega a la ruta del backend directamente con el id que se quiera exportar, también está en funcionamiento.
    const elementFile = document.createElement('a');
    elementFile.href = `data:application/octet-stream;charset=utf-8;utf-8,${routineString}`;
    elementFile.download = `${routineId}.fit`;
    document.body.appendChild(elementFile);
    elementFile.click();
    document.body.removeChild(elementFile);    
  });
}
  
function getTotalDuration(roundsList) {
  counter = 0;
  for(let round of roundsList) {
    if(round.tipoPaso === 'serie') {
      counter += 20;
    } else if(round.tipoPaso === 'pausa') {
      counter += round.datos.duracion;
    }    
  }
  return counter;
}

async function updateDuration(stepsList, routineId) {
  const duration = getTotalDuration(stepsList);
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ duracion: getTotalDuration(stepsList) })
  }
  const response = fetch(`/entrenamientos/${routineId}`, options);
}

function createRoutineFromFile(input) {
  const message = document.querySelector('#archive-selection .message');
  const buttonNext = document.querySelector('#archive-selection button-right');
  const archiveNav = new Navigation('#archive-selection', '#archive-selection button-left', '#archive-selection button-right');
  archiveNav.isClicked(archiveNav.prevButton, '#welcome');
  let file = input.files[0];
  if(!file.name.endsWith('.fit')) {
    console.log(
      `{
        error: {
          tipo: 'formato_invalido'          
        }
      }`);      
    message.style.visibility = 'normal';      
    message.textContent = '¡Oh, no! El archivo debe ser formato .fit';
    return;
  } else {  
    console.log('formato_valido');
    archiveNav.isClicked(archiveNav.nextButton, '#training-verification');  
    message.textContent = `Elegiste el archivo ${file.name}.`
    buttonNext.changeColor('var(--middle-blue)');
    const promise = new Promise(resolve => {    
      let reader = new FileReader();
      reader.onload = function() {
        resolve(reader.result);      
      }
      reader.readAsText(file);
  
    });
    promise.then(string => {
      const routineInfo = createRoutineFromString(string);
      const buttonArchive = document.querySelector('#archive-selection button-right');
      const buttonTraining = document.querySelector('#training-verification button-right');

      buttonArchive.addEventListener('click', async () => {
        const seriesElement = document.querySelector('#training-verification .series');
        const roundsElement = document.querySelector('#training-verification .rounds');
        const exercisesElement = document.querySelector('#training-verification .exercises');
        
        seriesElement.textContent = routineInfo.series;
        roundsElement.textContent = routineInfo.vueltas;      

        const responseExercises = await fetch('/ejercicios');
        const dataExercises = await responseExercises.json();
       
        const names = [];
        for(let i = 0; i < dataExercises.ejercicios.length; i++) {
          for(let j = 0; j < routineInfo.ejercicios.length; j++) {
            if(dataExercises.ejercicios[i].id === routineInfo.ejercicios[j]) {              
              names.push(' '.concat(dataExercises.ejercicios[i].nombre));  
            }      
          }        
        }

        exercisesElement.textContent = names;

        const routine = {
          series: routineInfo.series,
          vueltas: routineInfo.vueltas,
          ejercicios: routineInfo.ejercicios,
          pasosVuelta: createRoundSteps(routineInfo.series, routineInfo.ejercicios)
        }
        
        buttonTraining.addEventListener('click', async () => {
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(routine)
          }
    
          const response = await fetch('/entrenamientos/importar', options);
          const dataRoutine = await response.json();
          const buttonNext = document.querySelector('#training-verification button-right');
          const allRounds = multiplyRounds(dataRoutine.vueltas, dataRoutine.pasosVuelta); 
          const screen = document.querySelector('#preparation');   
          screen.startTotalCountdown(allRounds, dataRoutine);    
      
          saveRoutine(dataRoutine.id);
          updateDuration(allRounds, dataRoutine.id);
        });  
      })    
    })
  }  
}

function createRoutineFromString(routineString) {
  let numberSeries = routineString.slice(14, 16);
  let numberRounds = routineString.slice(16, 18);
  let exercises = routineString.slice(18).split(',');  
  
  if(numberSeries.startsWith('*')) {
    numberSeries = numberSeries.slice(1);
  } 
  if(numberRounds.startsWith('*')) {
    numberRounds = numberRounds.slice(1);
  } 

  let parsedExercises = [];
  for(let exercise of exercises) {
    parsedExercises.push(parseInt(exercise));
  }

  return {
    series: parseInt(numberSeries),
    vueltas: parseInt(numberRounds),
    ejercicios: parsedExercises
  }
}