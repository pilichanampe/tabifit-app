class CountdownBeating extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#countdown-beating", this);
  }; 
}

customElements.define("countdown-beating", CountdownBeating);