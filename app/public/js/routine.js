///// Automatic timer routine logic /////
/*function startRoutine(seriesTotal, roundsTotal) {
  let preparation = CounterChoice.counter;
  seriesTotal = CounterChoice.series;
  roundsTotal = CounterChoice.rounds;
  let duration = CounterChoice.duration;
  console.log("preparation", preparation, 'series', seriesTotal, 'rounds', roundsTotal, 'duration', duration);
}
*/

//console.log(preparation.duration, activity.duration, pause.duration);


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

module.exports = {
  createRoundSteps,
  multiplyRounds
}