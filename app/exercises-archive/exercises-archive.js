class ExerciseArchive extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#exercise-archive", this);
  }; 
}

customElements.define("exercise-archive", ExerciseArchive);