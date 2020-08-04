class ActivityInfo extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#activity-info", this);
  }; 
}

customElements.define("activity-info", ActivityInfo);