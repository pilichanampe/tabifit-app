class CountdownSpinning extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#countdown-spinning", this);
  }; 
}

customElements.define("countdown-spinning", CountdownSpinning);