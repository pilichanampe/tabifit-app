function loadTemplate(referenceTemplate, instanceComponente) {
  const template = document.querySelector(referenceTemplate);
  const templateContent = template.content;
  instanceComponente.attachShadow({ mode: "open" })
    .appendChild(templateContent.cloneNode(true));
}

/*
function loadScreen(idCurrentScreen, idNewScreen) {  
  const currentScreen = document.querySelector(idCurrentScreen);
  const newScreen = document.querySelector(idNewScreen);

  currentScreen.style.display = 'none';
  newScreen.style.display = 'flex';

}
*/






