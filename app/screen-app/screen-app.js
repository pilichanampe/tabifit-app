class ScreenApp extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#screen-app", this);
  }; 
}

customElements.define("screen-app", ScreenApp);