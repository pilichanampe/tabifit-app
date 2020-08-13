class ButtonRight extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#button-right", this);
  }; 
}

customElements.define("button-right", ButtonRight);