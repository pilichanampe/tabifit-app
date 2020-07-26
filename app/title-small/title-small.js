class TitleSmall extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#title-small", this);
  }; 
}

customElements.define("title-small", TitleSmall);