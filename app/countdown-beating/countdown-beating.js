class CountdownBeating extends HTMLElements {
  constructor() {
    super();

    loadTemplate("#countdown-beating", this);
  }; 
}

customElements.define("countdown-beating", CountdownBeating);