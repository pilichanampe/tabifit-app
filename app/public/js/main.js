//const { multiplyRounds, startRoutine } = require("./routine");
///// EXERCISES /////
function getExercises() {
  const exercisesList = document.querySelector('#exercises-selection exercises-list');

  fetch('/ejercicios')
  .then(res => res.json())
  .then(resExercises => {
    for(exercise of resExercises.ejercicios) {
      const exerciseItem = document.createElement('exercise-item');
      exerciseItem.textContent = exercise.nombre;
      exerciseItem.dataset.id = exercise.id;
      exerciseItem.dataset.abrev = exercise.abreviatura;
      exercisesList.appendChild(exerciseItem);
    }    
  });    
}

function getRoutine() {
  const button = document.querySelector('#exercises-selection button-right');
  button.addEventListener('click', async () => {
    const numberSeries = document.querySelector('#series-selection counter-choice').counter; 
    const numberRounds = document.querySelector('#rounds-selection counter-choice').counter;
    const exerciseList = document.querySelector('#exercises-selection exercises-list');
    const screen = document.querySelector('#preparation');
    
    const ejercicios = [];
    
    for(exercise of exerciseList.children) {
      if(exercise.isChecked()) {
        ejercicios.push(parseInt(exercise.dataset.id));
      }
    }
    const routine = { 
      series: numberSeries,
      vueltas: numberRounds,
      ejercicios: ejercicios,
      pasosVuelta: createRoundSteps(numberSeries, ejercicios)
    };
//     console.log('rutina que mando en getRoutine', routine)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(routine)
    }

    const response = await fetch('/entrenamientos', options);
    const dataRoutine = await response.json();
    const buttonNext = document.querySelector('#exercises-selection button-right');
    const allRounds = multiplyRounds(dataRoutine.vueltas, dataRoutine.pasosVuelta);    
    screen.startTotalCountdown(allRounds, dataRoutine);
 
    // creating the Routine String    
    routineString = createRoutineString(dataRoutine);

    //console.log('dataRoutine: ', dataRoutine);
    //console.log('route ID en main.js',dataRoutine.id);
    saveRoutine(dataRoutine.id);
    updateDuration(allRounds, dataRoutine.id);
  });  
}

function redirectToHome(selector) {
  const button = document.querySelector(selector);
  button.addEventListener('click', async () => {
    history.go(0);
  });

  
}

redirectToHome('#series-selection button-left');
redirectToHome('#archive-selection button-left');
redirectToHome('#finish-training #logout');
getExercises();
getRoutine();






























//////// NAVIGATION ////////



/*
/// SCREEN 1: Welcome ///
{
  const buttonStart = document.querySelector('#start');
  const buttonRepeat = document.querySelector('#repeat');
  buttonStart.addEventListener('click', () => {
    loadScreen('#welcome', '#series-selection');
  });
  buttonRepeat.addEventListener('click', () => {
    loadScreen('#welcome', '#training-verification');
  });
}


/// SCREEN 2: Series selection ///
{
  const buttonNext = document.querySelector('#series-selection button-right');
  const buttonPrev = document.querySelector('#series-selection button-left');
  buttonNext.addEventListener('click', () => {
    loadScreen('#series-selection', '#rounds-selection');
  });
  buttonPrev.addEventListener('click', () => {
    loadScreen('#series-selection', '#welcome');
  });  
}

/// SCREEN 3: Rounds selection ///
{
  const buttonNext = document.querySelector('#rounds-selection button-right');
  const buttonPrev = document.querySelector('#rounds-selection button-left');
  buttonNext.addEventListener('click', () => {
    loadScreen('#rounds-selection', '#exercises-selection');
  });
  buttonPrev.addEventListener('click', () => {
    loadScreen('#rounds-selection', '#series-selection');
  });  
}

/// SCREEN 4: Exercises selection ///
{
  const buttonNext = document.querySelector('#exercises-selection button-right');
  const buttonPrev = document.querySelector('#exercises-selection button-left');
  buttonNext.addEventListener('click', () => {
    loadScreen('#exercises-selection', '#preparation');
  });
  buttonPrev.addEventListener('click', () => {
    loadScreen('#exercises-selection', '#rounds-selection');
  }); 
  
}

/// SCREEN 5: Preparation ///

/// SCREEN 1: Activity ///

/// SCREEN 1: Pause ///

/// SCREEN 1: Finish training ///

/// SCREEN 1: Archive selection ///

/// SCREEN 10: Training verification ///
{
  const buttonNext = document.querySelector('#training-verification button-right');
  const buttonPrev = document.querySelector('#training-verification button-left');
  buttonNext.addEventListener('submit', () => {
    loadScreen('#training-verification', '#preparation');
  });
  buttonPrev.addEventListener('click', () => {
    loadScreen('#training-verification', '#welcome');
  }); 
  
}
*/