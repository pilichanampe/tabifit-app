class CountdownSpinning extends HTMLElement {
  constructor() {
    super();
    loadTemplate("#countdown-spinning", this);
    this.duration = this.getAttribute('duration');
    this.counter = this.duration;
  }; 

  static get observedAttributes() {
    return [ "duration" ];
  }

  connectedCallback() {
    const buttonNext = document.querySelector('#exercises-selection button-right');
    // TODO: revisar contenido de este custom event

    /*const countdownFinished = new CustomEvent('countdownFinished', {
      detail: {
        countdownSpin: countdown.value,
        countdownBeat: countdown
      }
    })
    */
    buttonNext.addEventListener('click', () => {
       /*
      if(this.duration === "10") {
        this.counter = 10;
      }
      
      if(this.duration === "20") {
        this.counter = 20;
      }
      */  
      this.setNumber();    
      this.setCountdown();
      
    });
    
    
  }

  setNumber() {
    const numberElement = this.shadowRoot.querySelector('.number');
    numberElement.textContent = this.duration;
  }
  setCountdown() {
    const numberElement = this.shadowRoot.querySelector('.number');
    const spinningBorder = this.shadowRoot.querySelector('.circle');
    const countdown = setInterval(() => { 
      if(this.counter === 1) {
        this.stopCountdown(countdown);        
        spinningBorder.style.animation = 'none'; 
        return;
      }  
      spinningBorder.style.animation = '1s rotate infinite';
      this.counter--;
      numberElement.textContent = this.counter;
      //console.log('numberElement en setInterval', numberElement.textContent);
    }, 1000);  
  }

  stopCountdown(countdown) {
    clearInterval(countdown);    
  }
  //metodo para probar algo.. no creo que sirva a la larga. Lo dejo acá por ahora por las dudas.
  getCounterFinished() {
    if(this.counter === 1) {
      console.log('soy this.counter en 1: this.counter')
    }
  }  

  getCounterValue() {
    // console.log("countdownElement.counter", countdownElement.counter);
     const countdownElement = document.querySelector('#preparation countdown-spinning');
     const countdownNumber = countdownElement.shadowRoot.querySelector('.number');
     console.log('queriendo mostrar valor de .number: ', countdownElement);
   }
}

customElements.define("countdown-spinning", CountdownSpinning);