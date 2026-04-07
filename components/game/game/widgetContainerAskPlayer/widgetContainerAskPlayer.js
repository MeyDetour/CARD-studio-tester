import { button } from "../../../button/button.js";
// obligé d'ajouter et de supprimer le composant et 
// de la mettre dans la page de base car la gameplay page est rechargé
// et supprimer le composant


function widgetContainerAskPlayer(
  title,
  message,
  buttonText,
  type,
  buttonFunctionName,
  params = {},
) {
  return /* html */ `
    <div class="widgetAskPlayer">
        <div class="container">
            <h1>${title}</h1>
            ${message ? `<p>${message}</p>` : ""}
            <div class="input-container"> 
              <input id="widgetInput" type="${type}" ${type === "number" ? `min="${parseInt (params.min) || 0}" max="${parseInt( params.max) || 100}"` : ""} placeholder="${type === "number" ? "Enter a number" : "Enter text"}">
            </div>
            <div class="buttonsContainer">
              ${button(null, null, null, buttonFunctionName, buttonText, "greenButton", {})}
              ${button(null, null, null, "hideAskPlayerWidget", "Annuler", "redButton", {})}
            </div>
        </div>
  </div>
        `;
}

// hide widget without any action
export function hideAskPlayerWidget() {
  let widget = document.querySelector(".widgetAskPlayer");
  if (widget) {
    widget.remove();
  }
}
window.hideAskPlayerWidget = hideAskPlayerWidget;


// get the value inside of the widget
function getValueOfAskPlayerWidget() {
  let input = document.querySelector("#widgetInput");
  if (input && input.value != "") {
    return input.value;
  }
  return null;
}
export function displayAskPlayerWidget(event, params, roomId) {
  let content = document.querySelector("#widgetDiv");
  if (content) {

    //submit the response
    window.sendAskPlayerValue = function () {
      console.log("send ask player value function");
      const obj = {insertedValue : getValueOfAskPlayerWidget()};
      console.log(obj);
      console.log(obj.insertedValue);
      if (socket && obj && obj.insertedValue!=null && obj.insertedValue!=undefined) {
        console.log({ roomId, event, obj, params });
        socket.emit("playerInsertedValue", {  event, obj, params });
        hideAskPlayerWidget();
      } else {
        console.warn("Dont find socket to send value of widget");
      }
    };

    let contenu = widgetContainerAskPlayer(
      event.event.requiresInput.label,
      event.event.requiresInput.description,
      "Valider",
      event.event.requiresInput.type,
      "sendAskPlayerValue",
      {
        min: event.event.requiresInput.min,
        max: event.event.requiresInput.max,
      },
    );
    console.log(contenu); 
    content.innerHTML = contenu;
    console.log(content);
  } else {
    console.warn("Dont find content to display widget");
  }
}
