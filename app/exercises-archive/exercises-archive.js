class ExercisesArchive extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#exercises-archive", this);
  }; 
}

customElements.define("exercises-archive", ExercisesArchive);