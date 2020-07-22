class ExerciseArchive extends HTMLElements {
  constructor() {
    super();

    loadTemplate("#exercise-archive", this);
  }; 
}

customElements.define("exercise-archive", ExerciseArchive);