class ScreenApp extends HTMLElements {
  constructor() {
    super();

    loadTemplate("#screen-app", this);
  }; 
}

customElements.define("screen-app", ScreenApp);