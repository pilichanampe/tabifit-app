class TrainingArchive extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#training-archive", this);
  }; 
}

customElements.define("training-archive", TrainingArchive);