class ButtonNormal extends HTMLElements {
  constructor() {
    super();

    loadTemplate("#button-normal", this);
  }; 
}

customElements.define("button-normal", ButtonNormal);

