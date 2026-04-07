export function gameplay_globalValues(data) {
 
  return /*html */ `
    <div class="gameplayGlobalValues">
    ${Object.keys(data)
      .map((key) => {
        if (data[key] == undefined || !data[key].display) {
          return "";
        }
        return /*html */ `
            <span>${key}: ${data[key].value ?? data[key]}</span>
            `;
      })
      .join("")}
    </div>
    `;
}

export function reloadComposant_gameplayGlobalValues(content, data) {
  let globalValuesContainer = document.querySelector(".gameplayGlobalValues");
  if (globalValuesContainer) {
    globalValuesContainer.remove();
  }
  content.innerHTML += gameplay_globalValues(data);
}
