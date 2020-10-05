class ScreenApp extends HTMLElement {
  constructor() {
    super();
    loadTemplate("#screen-app", this);
  };

  displayScreen(screenId) {
    const allScreens = document.querySelectorAll('screen-app');
    const screenElement = document.querySelector(screenId);
    allScreens.forEach(element => element.style.display = 'none');
    screenElement.style.display = 'flex';
  }

  leyendoScreen() {
    const screen = document.querySelector('screen-app');
    console.log('soy una screen', screen);
  }
  
  startTotalCountdown(stepsList, dataRoutine) {
    this.displayScreen('#preparation');
    const activityScreen = document.querySelector('#activity');
    const pauseScreen = document.querySelector('#pause');
    const prepScreen = document.querySelector('#preparation');
    const titleSmall = document.querySelector('#pause title-small');
    let titleNormal = document.querySelector('#pause title-normal');
    let countdownElement = document.querySelector('#preparation countdown-spinning');
    let countdownNumber = countdownElement.shadowRoot.querySelector('.number');
    let countdownCircle = countdownElement.shadowRoot.querySelector('.circle');
    let counter = 10;
    let counterSeries = 0;
    let counterRound = 1;
    countdownNumber.textContent = counter;
    countdownCircle.style.animation = 'rotate 1s infinite';
    
    const interval = setInterval(() => {
        if(counter > 1) {
          counter--;          
          if(prepScreen.style.display == 'flex' && counter === 1) {
            const titleSmall = document.querySelector('#preparation title-small');
            const titleNormal = document.querySelector('#preparation title-normal');
            titleSmall.style.visibility = 'hidden';
            titleNormal.style.visibility = 'visible';
          }
          if(pauseScreen.style.display == 'flex' && counter === 3) {
            titleSmall.textContent = '¡preparate!';
            countdownElement = document.querySelector('#pause countdown-spinning');
            countdownCircle = countdownElement.shadowRoot.querySelector('.circle');
            countdownCircle.style.animation = 'rotate 1s infinite';
            countdownCircle.style.borderRightColor = 'transparent';
            countdownCircle.style.borderBottomColor = 'transparent';          
          }
          
          if(pauseScreen.style.display == 'flex' && counter === 1) {
            titleSmall.style.visibility = 'hidden';
            titleNormal.style.visibility = 'visible';
            pauseScreen.style.backgroundColor = 'var(--middle2-blue)';
            countdownCircle.style.borderLeftColor = 'var(--white)';
            countdownCircle.style.borderTopColor = 'var(--white)';
            countdownNumber.style.color = 'var(--white)';            
          }
        } else {
          const step = stepsList.shift();
          if(step.tipoPaso === 'serie') {
            this.displayScreen('#activity');            
            if(counterSeries <= dataRoutine.series) {
              counterSeries++;              
            }

            if(activityScreen.style.display === 'flex') {
              const seriesElement = document.querySelector('#activity counter-fraction[data-series]');
              const roundElement = document.querySelector('#activity counter-fraction[data-round]');
              const numSeries = seriesElement.shadowRoot.querySelector('.numerator');
              const denSeries = seriesElement.shadowRoot.querySelector('.denominator');
              const numRound = roundElement.shadowRoot.querySelector('.numerator');
              const denRound = roundElement.shadowRoot.querySelector('.denominator');             

              if(counterSeries > dataRoutine.series) {
                counterSeries = 1;
                counterRound++;                
              }
              numSeries.textContent = counterSeries;
              denSeries.textContent = dataRoutine.series;
              numRound.textContent = counterRound;
              denRound.textContent = dataRoutine.vueltas;  
            }
            
            if(activityScreen.style.display === 'flex') {
              const exercisesList = document.querySelector('#exercises-selection exercises-list').children;
              titleNormal = document.querySelector('#activity title-normal');
              for(exercise of exercisesList) {
                if(step.datos.id == exercise.dataset.id) {
                  titleNormal.textContent = exercise.dataset.abrev;
                }
              }
            }
            counter = 20;
            countdownElement = document.querySelector('#activity countdown-spinning');
            countdownNumber = countdownElement.shadowRoot.querySelector('.number');
            countdownCircle = countdownElement.shadowRoot.querySelector('.circle');
            countdownNumber.textContent = counter;  
            countdownCircle.style.animation = 'rotate 1s infinite';  
          } else if(step.tipoPaso === 'pausa') {
            this.displayScreen('#pause');
            pauseScreen.style.backgroundColor = 'var(--white)'; 
            titleSmall.style.visibility = 'visible';
            titleSmall.style.color = 'var(--middle-blue)';            
            titleSmall.textContent = 'relax';
            titleNormal.style.visibility = 'hidden';
            counter = step.datos.duracion;
            countdownElement = document.querySelector('#pause countdown-spinning');
            countdownNumber = countdownElement.shadowRoot.querySelector('.number');
            countdownCircle = countdownElement.shadowRoot.querySelector('.circle');
            countdownCircle.style.animation = 'blink 1s infinite';
            countdownCircle.style.borderLeftColor = 'var(--middle-blue)';
            countdownCircle.style.borderTopColor = 'var(--middle-blue)';
            countdownCircle.style.borderRightColor = 'var(--middle-blue)';
            countdownCircle.style.borderBottomColor = 'var(--middle-blue)';
            countdownNumber.style.color = 'var(--middle-blue)'; 
            countdownNumber.textContent = counter;            
          }

          if(stepsList.length <= 0) {
            clearInterval(interval);
            this.displayScreen('#finish-training');
          }
        } 
        countdownNumber.textContent = counter;
    }, 1000);
  }  
}

customElements.define("screen-app", ScreenApp);