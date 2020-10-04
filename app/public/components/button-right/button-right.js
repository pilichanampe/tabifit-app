class ButtonRight extends HTMLElement {
  constructor() {
    super();
    loadTemplate("#button-right", this);
  }; 

  connectedCallback() {
    if(this.hasAttribute('grey')) {
      this.changeColor('var(--light-grey');
    }
  }

  changeColor(color) {
    this.shadowRoot.querySelector('button').style.backgroundColor = color;
  }
}

customElements.define("button-right", ButtonRight);