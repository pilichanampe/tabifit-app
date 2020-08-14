class ButtonNormal extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#button-normal", this);
  };
  
  connectedCallback() {
    
    
  }
  
}

customElements.define("button-normal", ButtonNormal);

