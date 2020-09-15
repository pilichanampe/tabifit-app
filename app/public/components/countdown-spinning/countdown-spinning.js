class CountdownSpinning extends HTMLElement {
  constructor() {
    super();
    loadTemplate("#countdown-spinning", this);
    this.duration = this.getAttribute('duration');
    this.counter = this.duration;
  }; 

  connectedCallback() {
    if(this.hasAttribute('pause')) {
      const circle = this.shadowRoot.querySelector('.circle');
      const number = this.shadowRoot.querySelector('.number');
      number.style.color = 'var(--middle-blue)';
      circle.style.borderColor = 'var(--middle-blue)';
      
    }
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

      // creé la función setNumber para que me cargue el primer número de la cuenta regresiva, pero no lo está haciendo ahora... no sé por qué
      //this.setNumber();    
      this.startCountdown();
      this.setCountdown();
      
      
    });
    
    
  }
  // Me parece que esta función no hace falta... la dejo por las dudas, todavía.
  setNumber() {
    const numberElement = this.shadowRoot.querySelector('.number');
    numberElement.textContent = this.duration;
  }
  
  startCountdown() {
    const numberElement = this.shadowRoot.querySelector('.number');
    const border = this.shadowRoot.querySelector('.circle');
    if(this.hasAttribute('pause')) {
      border.style.animation = 'blink 1s infinite';
    } else {
      border.style.animation = '1s rotate infinite';
    }
    //this.counter--;
    numberElement.textContent = this.counter;
    
    //console.log('numberElement en setInterval', numberElement.textContent);
  }
  /*
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
  */
 setCountdown() {
  setInterval(() => {
    const screen = document.querySelector('#pause')
    const border = this.shadowRoot.querySelector('.circle');
    const number = this.shadowRoot.querySelector('.number');
    const titleRelax = document.querySelector('#pause title-small');
    if(this.hasAttribute('pause')) {
      // The change generates visually at second 3
      if(this.counter === 4) {
        // por qué no me toma ningun cambio en animation??? No me deja parar el blink ni tampoco poner el rotate.
        border.style.animation = 'rotate 1s infinite';
        //el cambio de color hace que no se vea el título... Después mejoro para que no se muestre realmente.
        titleRelax.style.color = 'var(--middle2-blue)';
        //border.style.animation = '1s rotate infinite';
        screen.style.backgroundColor = 'var(--middle2-blue)';
        border.style.borderRightColor = 'transparent';
        border.style.borderBottomColor = 'transparent';
        border.style.borderLeftColor = 'var(--white)';
        border.style.borderTopColor = 'var(--white)';
        number.style.color = 'var(--white)';
      }
    }
  
    if(this.counter === 1) {
      this.stopCountdown(this.setCountdown());        
      border.style.animation = 'none';
      titleRelax.style.color = 'var(--middle-blue)';
      screen.style.backgroundColor = 'var(--white)';
      if(this.hasAttribute('pause')) {
        border.style.borderRightColor = 'transparent';
        border.style.borderBottomColor = 'transparent';
        border.style.borderLeftColor = 'var(--middle-blue)';
        border.style.borderTopColor = 'var(--middle-blue)'; 
        number.style.color = 'var(--middle-blue)';
      }
      return;
    }  
    this.counter--;
    this.startCountdown();
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

   getNumber() {
     return this.shadowRoot.querySelector('.number');
   }
}

customElements.define("countdown-spinning", CountdownSpinning);