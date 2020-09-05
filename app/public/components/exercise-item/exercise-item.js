class ExerciseItem extends HTMLElement {
  constructor() {
    super();

    loadTemplate("#exercise-item", this);
  };
 
  isChecked() {
    return this.shadowRoot.querySelector('input').checked;
  }  
}

customElements.define("exercise-item", ExerciseItem);