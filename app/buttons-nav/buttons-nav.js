class ButtonsNav extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#buttons-nav", this);
  }; 
}

customElements.define("buttons-nav", ButtonsNav);