class TrainingArchive extends HTMLElements {
  constructor() {
    super();

    loadTemplate("#training-archive", this);
  }; 
}

customElements.define("training-archive", TrainingArchive);