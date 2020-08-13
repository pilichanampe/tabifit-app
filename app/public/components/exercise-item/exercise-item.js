class ExerciseItem extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#exercise-item", this);
  }; 
}

customElements.define("exercise-item", ExerciseItem);