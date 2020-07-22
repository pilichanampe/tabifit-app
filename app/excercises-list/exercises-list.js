class ExercisesList extends HTMLElements {
  constructor() {
    super();

    loadTemplate("#exercises-list", this);
  }; 
}

customElements.define("exercises-list", ExercisesList);