class ScreenApp extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#screen-app", this);
  };

  static get observedAttributes() {
    return [ "duration" ];
  }
  
  connectedCallback() {  
    const countdownPrep = document.querySelector('#preparation countdown-spinning'); 
    const countdownActivity = document.querySelector('#activity countdown-spinning'); 
    const countdownPause = document.querySelector('#pause countdown-beating'); 
    
    if(this.contains(countdownPrep)) {
      console.log("HOLA PREP", countdownPrep.duration);
    }  
    if(this.contains(countdownActivity)) {
      const countdownElement = document.querySelector('countdown-spinning');
    const countdownNumber = countdownElement.shadowRoot.querySelector('.number');
      console.log("HOLA ACTIVITY", countdownActivity.duration);
    }  
    if(this.contains(countdownPause)) {
      console.log("HOLA PAUSE", countdownPause.duration);
    }    
    
  }   
  
}

customElements.define("screen-app", ScreenApp);