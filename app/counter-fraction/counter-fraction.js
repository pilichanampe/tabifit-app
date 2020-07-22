class CounterFraction extends HTMLElements {
  constructor() {
    super();

    loadTemplate("#counter-fraction", this);
  }; 
}

customElements.define("counter-fraction", CounterFraction);