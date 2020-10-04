class ExercisesList extends HTMLElement {
  constructor() {
    super();
    loadTemplate("#exercises-list", this);
  }; 
}

customElements.define("exercises-list", ExercisesList);