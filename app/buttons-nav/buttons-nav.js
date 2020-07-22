class ButtonsNav extends HTMLElements {
  constructor() {
    super();

    loadTemplate("#buttons-nav", this);
  }; 
}

customElements.define("buttons-nav", ButtonsNav);