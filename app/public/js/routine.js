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

class Routine {
  constructor(series, rounds) {
    //La info de series y rounds debe venir de la base de datos. No sé cómo, pero es la idea...
    this.series = series;
    this.rounds = rounds;
    this.preparation = this.getCountdownNumber('#preparation countdown-spinning');
    this.activity = document.querySelector('#activity countdown-spinning');
    this.pause = document.querySelector('#preparation countdown-spinning');
  }

  

}


