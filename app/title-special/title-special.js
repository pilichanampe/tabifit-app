class TitleSpecial extends HTMLElements {
  constructor() {
    super();

    loadTemplate("#title-special", this);
  }; 
}

customElements.define("title-special", TitleSpecial);