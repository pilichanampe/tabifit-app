class CountdownBeating extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#countdown-beating", this);
  }; 

  connectedCallback() {
    
  }
}

customElements.define("countdown-beating", CountdownBeating);