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
  const hour = (dataRoutine.fecha.slice(11, 13) - 3).toString();
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
      const routineGet = await fetch(`/entrenamientos/${routineId}`);
      const dataRoutineGet = await routineGet.json();
      const routineString = createRoutineString(dataRoutineGet);

      //Test
      console.log('soy routineString : ', routineString)
      
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ routineString })
      }  
      const routinePost = await fetch(`/entrenamientos/${routineId}/exportar`, options);
      const dataRoutinePost = await routinePost.json();

      const fileGet = await fetch(`/entrenamientos/${routineId}/exportar`);
      const fileGetRes = await fileGet.json();
      console.log('soy fileGetREs', fileGetRes)
      
      // BORRAR
      
      console.log('dataRoutinePost en routine.js',dataRoutinePost);
      console.log('routineString en routine.js',routineString);     
    })
  }
  
  


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