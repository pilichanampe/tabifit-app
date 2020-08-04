class ButtonsContainer extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#buttons-container", this);
  }; 
}

customElements.define("buttons-container", ButtonsContainer);