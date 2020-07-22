class TitleSmall extends HTMLElements {
  constructor() {
    super();

    loadTemplate("#title-small", this);
  }; 
}

customElements.define("title-small", TitleSmall);