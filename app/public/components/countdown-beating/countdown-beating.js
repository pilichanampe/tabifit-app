class CountdownBeating extends HTMLElement {
  constructor() {
    super();
    loadTemplate("#countdown-beating", this);
    this.counter = 10;
  }; 

  connectedCallback() {
   // this.setCountdown();    
  }

  setCountdown() {
    const number = this.shadowRoot.querySelector('.number');
    if(this.counter === 1) {
      clearInterval(this.setCountdown);
    }
    setInterval(() => {   
      this.counter--;
      number.innerHTML = this.counter;
    }, 1000);
  }

  
}

customElements.define("countdown-beating", CountdownBeating);