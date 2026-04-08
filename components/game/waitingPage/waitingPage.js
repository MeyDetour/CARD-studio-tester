import { button } from "../../button/button.js";
import { headerComponent } from "../../header/header.js";
import { waitingPagePlayersBlock } from "./waitingPagePlayersBlock/waitingPagePlayersBlock.js";
import { waitingPageCopyBlock } from "./waitingPageCopyBlock/waitingPageCopyBlock.js"; 
export function waitingPage() {
 
  return /*html */ ` 
      <div class="waitingPage"> 
        ${headerComponent("game")}
        <div class="row">
            <div class="left"  >
                <div class="copyBlock">
                  ${waitingPageCopyBlock()}
                </div>
                <div class="players-container">
                  ${waitingPagePlayersBlock()}
                </div>
            </div>
            <div class="right">
                  
            </div>
        </div>
    `;
}

export function reloadComposant_waitingPage() {
  let content = document.querySelector("#content");
  if (!content) {
    return;
  }
  content.innerHTML = waitingPage();
}
 