import { apiClient } from "../../../src/helpers/api.js";
import { button } from "../../button/button.js";
import { rate } from "./rate/rate.js";
import { getGameData } from "../../../src/controller/game/dataStorage.js";
// obligé d'ajouter et de supprimer le composant et 
// de la mettre dans la page de base car la gameplay page est rechargé
// et supprimer le composant


function widgetLetCommentaire( 
  buttonFunctionName, 
) {
  return /* html */ `
    <div class="widgetLetCommentaire">
        <div class="container">
            <h1>Laisser un commentaire</h1> 
            ${rate()}
            <div class="input-container"> 
              <textarea id="widgetInput" type="text"   placeholder="Ecrivez votre commentaire..."></textarea>
            </div>
            <div class="buttonsContainer">
              ${button(null, null, null, buttonFunctionName, "Envoyer", "greyButton")}
              ${button(null, null, null, "hideLetCommentWidget", "Annuler", "redButton", {})}
            </div>
        </div>
  </div>
        `;
}

// hide widget without any action
export function hideLetCommentWidget() {
  let widget = document.querySelector(".widgetLetCommentaire");
  if (widget) {
    widget.remove();
  }
}
window.hideLetCommentWidget = hideLetCommentWidget;


// get the value inside of the widget
function getCommentInCommentInput() {
  let input = document.querySelector("#widgetDivComment textarea");
  if (input && input.value != "") {
    return input.value;
  }
  return null;
}// get the value inside of the widget
function getRateInCommentInput() {
  const checked = document.querySelector('.widgetLetCommentaire input[name="rating"]:checked');
  if (!checked) {
    return null;
  }
  return parseInt(checked.value);
}
export function displayLetCommentWidget( ) {
  let gameData = getGameData();
  if (!gameData) {
    console.warn("No game data found to display let comment widget");
    return;
  }

  let content = document.querySelector("#widgetDivComment");
  if (content) {

    //submit the response
    window.sendLetCommentValue = function () {
      console.log("send let comment value function");
      const obj = {description : getCommentInCommentInput(),rate: getRateInCommentInput()};
      console.log(obj);
      console.log(obj.description);
      if (socket && obj && obj.description!=null && obj.rate!=undefined) {
        
        apiClient("new/note/game/"+gameData.roomInDb.id,obj)
 
        hideLetCommentWidget();
      } else {
        console.warn("Dont find socket to send value of widget");
      }
    };

    let contenu = widgetLetCommentaire(  
      "sendLetCommentValue"
    ); 
    content.innerHTML = contenu; 
  } else {
    console.warn("Dont find content to display widget");
  }
}

window.displayLetCommentWidget =displayLetCommentWidget