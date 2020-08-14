class CounterChoice extends HTMLElement {
  constructor() {
    super();
    loadTemplate("#counter-choice", this);
    this.counter = 1;
  };
  
  connectedCallback() {
    const incrementButton = this.shadowRoot.querySelector('.increment');
    const decrementButton = this.shadowRoot.querySelector('.decrement');
    
    incrementButton.addEventListener('click', () => {
      this.incrementNumber();
    });

    decrementButton.addEventListener('click', () => {
      this.decrementNumber();
    });  
  }

  incrementNumber() {
    this.counter++;
    this.updateNumber();

  }

  decrementNumber() {
    this.counter--;
    this.updateNumber();

  }

  updateNumber() {
    let number = this.shadowRoot.querySelector("input");
    number.value = this.counter;
    console.log("el contenido de number es", number.value);
  }
}

customElements.define("counter-choice", CounterChoice);