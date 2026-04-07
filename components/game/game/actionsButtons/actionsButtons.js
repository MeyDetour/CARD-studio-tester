import { button } from "../../../button/button.js";
import { isPassifPlayer } from "../../../../src/controller/game/players.js";
export function gameplay_actionsButtons(
  actions,
  isCurrentTurn,
  currentPlayer,
  roomId,
) {
  if (isPassifPlayer(currentPlayer)) {
    return "";
  }
  return /*html */ `
   <div class="actionsContainer">
    ${actions
      .map((action) => {
        let mustAppear =
          !action.appearAtPlayerTurn ||
          (action.appearAtPlayerTurn && isCurrentTurn);

        if (!mustAppear) return "";

        return button(null, null, null, "doAction", action.name, "greyButton", {
          action: action.name,
          actionType: action.type || "default",
        });
      })
      .join("")}
        </div>  
     `;
}

export function reloadComposant_gameplayActionsButtons(
  content,
  actions,
  isCurrentTurn,
  currentPlayer,
  roomId,
) {
  let actionsContainer = document.querySelector(".actionsContainer");
  if (actionsContainer) {
    actionsContainer.remove();
  }
  content.innerHTML += gameplay_actionsButtons(
    actions,
    isCurrentTurn,
    currentPlayer,
    roomId,
  );
}
