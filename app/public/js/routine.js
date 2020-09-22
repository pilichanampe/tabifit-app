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
  const exercises = dataRoutine.ejercicios.toString();    

  return year.concat(month, day, hour, minutes, seconds, series, rounds, exercises);
}

/*
module.exports = {
  createRoundSteps,
  multiplyRounds
}
*/