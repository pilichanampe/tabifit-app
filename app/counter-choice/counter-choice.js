class CounterChoice extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#counter-choice", this);
  }; 
}

customElements.define("counter-choice", CounterChoice);