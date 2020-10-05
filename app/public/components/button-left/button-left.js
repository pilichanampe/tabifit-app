class ButtonLeft extends HTMLElement {
  constructor() {
    super();
    loadTemplate("#button-left", this);
  }; 
}

customElements.define("button-left", ButtonLeft);