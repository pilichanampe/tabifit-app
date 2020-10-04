class TitleNormal extends HTMLElement {
  constructor() {
    super();
    loadTemplate("#title-normal", this);
  }; 
}

customElements.define("title-normal", TitleNormal);