class CountdownSpinning extends HTMLElement {
  constructor() {
    super();
    loadTemplate("#countdown-spinning", this);
    this.counter = 10;
  }; 

  connectedCallback() {
    const buttonNext = document.querySelector('#exercises-selection button-right');
    
    buttonNext.addEventListener('click', () => {
      
      this.setCountdown();
    });
    
  }

  setCountdown() {
    const number = this.shadowRoot.querySelector('.number');
    const spinningBorder = this.shadowRoot.querySelector('.circle');
    const countdown = setInterval(() => { 
      if(this.counter === 1) {
        this.stopCountdown(countdown);        
        spinningBorder.style.animation = 'none';        
        return;
      }  
      this.counter--;
      spinningBorder.style.animation = '1s rotate infinite';
      number.innerHTML = this.counter;
      console.log(number.textContent);
    }, 1000);  
  }

  startCountdown() {

  }

  stopCountdown(countdown) {
    clearInterval(countdown);
  }

}

customElements.define("countdown-spinning", CountdownSpinning);