class CounterChoice extends HTMLElements {
  constructor() {
    super();

    loadTemplate("#counter-choice", this);
  }; 
}

customElements.define("counter-choice", CounterChoice);