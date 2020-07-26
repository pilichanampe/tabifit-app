class CounterFraction extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#counter-fraction", this);
  }; 
}

customElements.define("counter-fraction", CounterFraction);