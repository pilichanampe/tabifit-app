class CounterChoice extends HTMLElement {
  constructor() {
    super();
    loadTemplate("#counter-choice", this);
    this.counter = 0;
    this.series = this.getAttribute('series');
    this.rounds = this.getAttribute('rounds');
  };

  static get observedAttributes() {
    return [ "series", "rounds" ];
  }
  
  connectedCallback() {
    const incrementButton = this.shadowRoot.querySelector('.increment');
    const decrementButton = this.shadowRoot.querySelector('.decrement');
    let number = this.shadowRoot.querySelector("input");
    
    if(this.hasAttribute('series')) {
      number.value = parseInt(this.series);
      this.counter = parseInt(this.series);
     // console.log('valor de counter en series es', this.counter);
    } else if(this.hasAttribute('rounds')) {
      number.value = parseInt(this.rounds);
      this.counter = parseInt(this.rounds);
     // console.log('valor de counter en rondas es', this.counter);
    }
   
    incrementButton.addEventListener('click', () => {
      this.incrementNumber();
    });

    decrementButton.addEventListener('click', () => {
      this.decrementNumber();
    });  
  }

  attributeChangedCallback() {
   
  }  

  incrementNumber() {
    if(this.hasAttribute('series')) {
      this.counter = this.series;
      
      if(this.counter >= 10) {
        this.counter = 10;        
        
      } else {
        this.counter++;
        this.series = this.counter;
        
      }    
      this.updateNumber();      
    }

    if(this.hasAttribute('rounds')) {
      this.counter = this.rounds;      

      if(this.counter >= 10) {
        this.counter = 10;
        //this.rounds = this.counter;
      } else {
        this.counter++;
        this.rounds = this.counter;
      }    
      this.updateNumber();
    }
    
  }

  decrementNumber() {
    if(this.hasAttribute('series')) {
      if(this.counter <= 1) {
        this.counter = 1;
        this.series = this.counter;
      } else {
        this.counter--;
        this.series = this.counter;
      }    
      this.updateNumber();
    } 
    
    if(this.hasAttribute('rounds')) {
      if(this.counter <= 1) {
        this.counter = 1;
        this.rounds = this.counter;
      } else {
        this.counter--;
        this.rounds = this.counter;
      }    
      this.updateNumber();
    }    
  }

  updateNumber() {
    let number = this.shadowRoot.querySelector("input");
    number.value = this.counter;
    //console.log("el contenido de number es", number.value);
  }

  writeNumber() {
    //Acá escribir las validaciones para cuando pase un evento de teclado, que no pueda poner números negativos ni números mayores a 10.
  }

  // Función que buscaba setear cada counter según las necesidades de la pantalla... pero no sé cómo, con un selector que está en el light DOM, decirle que quiero que cambie algo del shadowDOM.
  setCounterNumber(lightSelector, shadowSelector, value, min, max) {
    const counter = this.shadowRoot.querySelector(selector);
    counter.setAttribute("value", value);
    counter.setAttribute("min", min);
    counter.setAttribute("max", max);
  }
}


customElements.define("counter-choice", CounterChoice);

