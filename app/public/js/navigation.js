class Navigation {
  constructor(currentScreen, prevButton, nextButton) {
    this.currentScreen = document.querySelector(currentScreen);
    this.prevButton = document.querySelector(prevButton);
    this.nextButton = document.querySelector(nextButton);
  }

  loadScreen(screen) {
    const newScreen = document.querySelector(screen);
    this.currentScreen.style.display = 'none';
    newScreen.style.display = 'flex';
  }

  isClicked(buttonClicked, idScreen) {
    buttonClicked.addEventListener('click', () => {
      this.loadScreen(idScreen);
    });
  }
}


/// Navigation Screen 1: Welcome ///
const welcomeNav = new Navigation('#welcome', '#welcome #repeat', '#welcome #start');

welcomeNav.isClicked(welcomeNav.prevButton, '#archive-selection');
welcomeNav.isClicked(welcomeNav.nextButton, '#series-selection');

/// Navigation Screen 2: Series selection ///
const seriesNav = new Navigation('#series-selection', '#series-selection button-left', '#series-selection button-right');

seriesNav.isClicked(seriesNav.prevButton, '#welcome');
seriesNav.isClicked(seriesNav.nextButton, '#rounds-selection');

/// Navigation Screen 3: Rounds selection ///
const roundsNav = new Navigation('#rounds-selection', '#rounds-selection button-left', '#rounds-selection button-right');

roundsNav.isClicked(roundsNav.prevButton, '#series-selection');
roundsNav.isClicked(roundsNav.nextButton, '#exercises-selection');

/// Navigation Screen 4: Exercises Selection ///
const exercisesNav = new Navigation('#exercises-selection', '#exercises-selection button-left', '#exercises-selection button-right');

exercisesNav.isClicked(exercisesNav.prevButton, '#rounds-selection');
exercisesNav.isClicked(exercisesNav.nextButton, '#preparation');

/// Navigation Screen 5: Preparation ///
const prepNav = new Navigation('#preparation', '#preparation title-normal', '#preparation countdown-spinning');

prepNav.isClicked(prepNav.prevButton, '#exercises-selection');
prepNav.isClicked(prepNav.nextButton, '#activity');

/// Navigation Screen 6: Activity ///
const activityNav = new Navigation('#activity', '#activity title-normal', '#activity countdown-spinning');

activityNav.isClicked(activityNav.prevButton, '#preparation');
activityNav.isClicked(activityNav.nextButton, '#pause');

/// Navigation Screen 7: Pause ///
const pauseNav = new Navigation('#pause', '#pause title-small', '#pause countdown-spinning');

pauseNav.isClicked(pauseNav.prevButton, '#activity');
pauseNav.isClicked(pauseNav.nextButton, '#finish-training');
/// Navigation Screen 8: Finish Training ///
const finishNav = new Navigation('#finish-training', '#finish-training #save', '#finish-training #logout');


finishNav.isClicked(finishNav.nextButton, '#welcome');

/// Navigation Screen 9: Archive Selection ///
const archiveNav = new Navigation('#archive-selection', '#archive-selection button-left', '#archive-selection button-right');

archiveNav.isClicked(archiveNav.prevButton, '#welcome');
archiveNav.isClicked(archiveNav.nextButton, '#preparation');
/// Navigation Screen 10: Training Verification ///
const trainingNav = new Navigation('#training-verification', '#training-verification button-left', '#training-verification button-right');

trainingNav.isClicked(trainingNav.prevButton, '#welcome');
trainingNav.isClicked(trainingNav.nextButton, '#preparation');