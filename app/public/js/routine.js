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
  //Con la forma de abajo fuerzo que todas las fechas se manejen en hora local, pero harcodeado
  //Me parece mejor usar directamente UTC que maneja node y no tener conflictos en los archivos.
  //const hour = "0".concat((dataRoutine.fecha.slice(11, 13) - 3).toString()).slice(-2);
  const hour = dataRoutine.fecha.slice(11, 13);
  const minutes = dataRoutine.fecha.slice(14, 16);
  const seconds = dataRoutine.fecha.slice(17, 19);
  const series = dataRoutine.series.toString().padStart(2, '*');
  const rounds = dataRoutine.vueltas.toString().padStart(2, '*');
  let exercises = ""
  if (dataRoutine.ejercicios) {exercises = dataRoutine.ejercicios.toString();}
  if (dataRoutine.lista_ejercicios) {exercises = dataRoutine.lista_ejercicios.toString();}

  return year.concat(month, day, hour, minutes, seconds, series, rounds, exercises);
}

function saveRoutine(routineId) { 
  const saveButton = document.querySelector('#finish-training button-normal#save');
  saveButton.addEventListener('click', async () => {
    // hacer un get de la rutina con el RoutineId       
    //console.log('soy routineId : ', routineId)
    const routineGet = await fetch(`/entrenamientos/${routineId}`);
    const dataRoutineGet = await routineGet.json();
    const routineString = createRoutineString(dataRoutineGet);

    //Test
    //console.log('soy routineString : ', routineString)
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ routineString })
    }  
    let routinePost = await fetch(`/entrenamientos/${routineId}/exportar`, options);
    //const dataRoutinePost = await routinePost.json();


    //let routineGet2 = await fetch(`/entrenamientos/${routineId}/exportar`);
    //const dataRoutineGet2 = await routineGet2.json();

    const elementFile = document.createElement('a')
    elementFile.href = `data:application/octet-stream;charset=utf-8;utf-8,${routineString}`
    elementFile.download = `${routineId}.fit`
    document.body.appendChild(elementFile)
    elementFile.click()
    document.body.removeChild(elementFile)
    
    //const fileGet = await fetch(`/entrenamientos/${routineId}/exportar`);
    //const fileGetRes = await fileGet.json();
    //console.log('soy fileGetREs', fileGetRes)
    
    // BORRAR
    
    //console.log('dataRoutinePost en routine.js',dataRoutinePost);
    //console.log('routineString en routine.js',routineString);     
  })
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
  //const responseRoutine = fetch('/entrenamientos');
  //const dataRoutine = response.json();
  //const allRounds = multiplyRounds(dataRoutine.vueltas, dataRoutine.pasosVuelta);

  const duration = getTotalDuration(stepsList);
  //console.log('duration ', duration);
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ duracion: getTotalDuration(stepsList) })
  }
  const response = fetch(`/entrenamientos/${routineId}`, options);
  //const dataId = response.json();

}

function createRoutineFromFile(input) {
  
  let file = input.files[0];  
  const promise = new Promise(resolve => {    
    let reader = new FileReader();
    reader.onload = function() {
      //console.log('archivo leido: ', reader.result);
      resolve(reader.result);      
    }
    reader.readAsText(file);

  });

  promise.then(string => {
    //self.routineInfo = createRoutineFromString(string);
    const routineInfo = createRoutineFromString(string);
    //console.log('routineINfo', routineInfo)
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
      //console.log('dataExercises: ', dataExercises.ejercicios)

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
      //console.log('routine que mando al back', routine);

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
    
        //console.log('dataRoutine: ', dataRoutine);
        //console.log('route ID en main.js',dataRoutine.id);
        saveRoutine(dataRoutine.id);
        updateDuration(allRounds, dataRoutine.id);
      });  
    })

    
  })

  
}
// PROBANDO FUNCIÓN DE INTERNET
 /*
function createRoutineFromFile(input) {
   buttonOpen = document.querySelector('#archive-selection input');
   
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = async function() {
    console.log('archivo leido: ', reader.result);
    console.log('string hecha rutina: ', createRoutineFromString(reader.result));
    const routineString = reader.result;
    const routineInfo = createRoutineFromString(routineString);

    const routine = {
      series: routineInfo.series,
      vueltas: routineInfo.vueltas,
      ejercicios: routineInfo.ejercicios,
      pasosVuelta: createRoundSteps(routineInfo.series, routineInfo.ejercicios)
    }
    //console.log('routine que mando al back', routine)

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

    //console.log('dataRoutine: ', dataRoutine);
    //console.log('route ID en main.js',dataRoutine.id);
    saveRoutine(dataRoutine.id);
    updateDuration(allRounds, dataRoutine.id);
    };

  reader.onerror = function() {
    console.log(reader.error);
  };
}
*/
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



/*function uploadFile() {
  button = document.querySelector('#input-file');
  button.addEventListener('change', () => {
    var fr=new FileReader(); 
    fr.onload=function(){ 
      document.getElementById('output') 
      .textContent=fr.result; 
    }
    fr.readAsText(this.files[0]);
  });
}*/


/*
  const saveButton = document.querySelector('#finish-training button-normal#save');
  saveButton.addEventListener('click', async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: idRoutine})
    }
    const response = await fetch(`/entrenamientos/${idRoutine}/exportar`, options);
    const dataResponse = await response.json();
  });
}

*/

/*
module.exports = {
  createRoundSteps,
  multiplyRounds,
  createRoutineString
}
*/