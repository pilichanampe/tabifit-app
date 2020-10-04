function loadTemplate(referenceTemplate, instanceComponente) {
  const template = document.querySelector(referenceTemplate);
  const templateContent = template.content;
  instanceComponente.attachShadow({ mode: "open" })
    .appendChild(templateContent.cloneNode(true));
}





