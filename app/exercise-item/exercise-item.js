class ExerciseItem extends HTMLElements {
  constructor() {
    super();

    loadTemplate("#exercise-item", this);
  }; 
}

customElements.define("exercise-item", ExerciseItem);