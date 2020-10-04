class CounterChoice extends HTMLElement {
  constructor() {
    super();
    loadTemplate("#counter-choice", this);
    this.counter = 0;
    this.series = this.getAttribute('series');
    this.rounds = this.getAttribute('rounds');
  };
  
  connectedCallback() {
    const incrementButton = this.shadowRoot.querySelector('.increment');
    const decrementButton = this.shadowRoot.querySelector('.decrement');
    let number = this.shadowRoot.querySelector("input");   
    
    if(this.hasAttribute('series')) {
      number.value = parseInt(this.series);
      this.counter = parseInt(this.series);
    } else if(this.hasAttribute('rounds')) {
      number.value = parseInt(this.rounds);
      this.counter = parseInt(this.rounds);
    }
   
    incrementButton.addEventListener('click', () => {
      this.incrementNumber();
    });

    decrementButton.addEventListener('click', () => {
      this.decrementNumber();
    }); 
    
    this.changedNumber();
  }

  incrementNumber() {
    this.counter = this.series;
    this.validateNumber();   
    this.counter++;
    this.series = this.counter;   
    this.updateNumber();    
  }

  decrementNumber() {    
    this.validateNumber();    
    this.counter--;
    this.series = this.counter;   
    this.updateNumber();   
  }

  changedNumber() {
    const number = this.shadowRoot.querySelector("input");   
    number.addEventListener('input', e => {
      this.counter = e.target.value;
      this.updateNumber();                
    });
  }

  updateNumber() {
    let number = this.shadowRoot.querySelector("input");
    this.validateNumber();   
    number.value = this.counter;    
  } 

  validateNumber() {
    if(this.counter >= 10) {
      this.counter = 10;      
    }
    if(this.counter <= 1) {
      this.counter = 1;      
    }
  }
}

customElements.define("counter-choice", CounterChoice);

