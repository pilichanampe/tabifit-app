class ButtonNormal extends HTMLElement {
  constructor() {
    super();
    loadTemplate("#button-normal", this);
  }; 
}

customElements.define("button-normal", ButtonNormal);

