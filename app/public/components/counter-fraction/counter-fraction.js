class CounterFraction extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#counter-fraction", this);
  };
  
  connectedCallback() {
    
    
  }

  getNumerator() {
    return this.shadowRoot.querySelector('.numerator');
  }

  getDenominator() {
    return this.shadowRoot.querySelector('.denominator');
  }
}

customElements.define("counter-fraction", CounterFraction);