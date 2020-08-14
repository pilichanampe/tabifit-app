class ButtonLeft extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#button-left", this);
  }; 

connectedCallback() {
  
}

}

customElements.define("button-left", ButtonLeft);