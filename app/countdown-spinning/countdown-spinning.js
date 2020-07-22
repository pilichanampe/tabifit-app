class CountdownSpinning extends HTMLElements {
  constructor() {
    super();

    loadTemplate("#countdown-spinning", this);
  }; 
}

customElements.define("countdown-spinning", CountdownSpinning);