class ImgLogo extends HTMLElements {
  constructor() {
    super();

    loadTemplate("#img-logo", this);
  }; 
}

customElements.define("img-logo", ImgLogo);