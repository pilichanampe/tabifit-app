class TitleNormal extends HTMLElements {
  constructor() {
    super();

    loadTemplate("#title-normal", this);
  }; 
}

customElements.define("title-normal", TitleNormal);