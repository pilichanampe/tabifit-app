class CountdownSpinning extends HTMLElement {
  constructor() {
    super();
    loadTemplate("#countdown-spinning", this);
    this.duration = this.getAttribute('duration');
    this.counter = this.duration;
  }
}

customElements.define("countdown-spinning", CountdownSpinning);