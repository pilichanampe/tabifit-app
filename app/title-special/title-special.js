class TitleSpecial extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#title-special", this);
  }; 
}

customElements.define("title-special", TitleSpecial);