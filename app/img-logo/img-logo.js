class ImgLogo extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#img-logo", this);
  }; 
}

customElements.define("img-logo", ImgLogo);