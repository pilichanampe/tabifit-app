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

welcomeNav.isClicked(welcomeNav.prevButton, '#training-verification');
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

/// Navigation Screen 5: Welcome ///

/// Navigation Screen 6: Welcome ///

/// Navigation Screen 7: Welcome ///

/// Navigation Screen 8: Welcome ///

/// Navigation Screen 9: Welcome ///

/// Navigation Screen 10: Welcome ///
const trainingNav = new Navigation('#training-verification', '#training-verification button-left', '#training-verification button-right');

trainingNav.isClicked(trainingNav.prevButton, '#welcome');
trainingNav.isClicked(trainingNav.nextButton, '#preparation');