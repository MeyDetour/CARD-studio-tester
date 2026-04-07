import { headerComponent } from "../../components/header/header.js";
import { button } from "../../components/button/button.js";
import { spookySkins } from "../../data/spookySkins.js";
import { defaultsPseudo } from "../../data/pseudo.js";
export function choosePseudoPage(params = {}) {
  const gameId = params.gameId;
  const name = params.name;
  const roomId = params.roomId;

  let pseudo =
    defaultsPseudo[Math.floor(Math.random() * defaultsPseudo.length)];
  let index = Math.floor(Math.random() * spookySkins.length);
  let skin = spookySkins[index];
  return /*html*/ `  <div class="choosePseudoPage">
        ${headerComponent("choose-pseudo")}
        <div class="box">
        <div class="head" style="background-color: ${skin.color}">
              <h1>${name}</h1> 
        </div> 
        <div class="choiceSkins">
              ${button(
                "left-arrow-without-tail",
                null,
                null,
                "previousChangeSkin",
                null,
                "leftArrow"
              )}
              <img src="/assets/images/spooky-skins/${skin.name}.png" class="choose-skin-image" data-skin="${skin.name}" data-skin-index="${index}" alt="Skin ${skin}">
              ${button(
                "right-arrow-without-tail",
                null,
                null,
                "nextChangeSkin",
                null,
                "rightArrow"
              )}
          </div>
          <div class="inputContainer">
            <span>Pseudo</span>
            <span id="error"></span>
            <input id="pseudo" oninput="updateCharacterCount()" type="text" value="${pseudo}"/>
            <span class="caractereCount">${pseudo.length}/20 caractères</span>
            </div>
          ${button(null, null, null, "gameLogin", "Rejoindre", "dark-grey", {
            gameId: gameId,
            roomId: roomId,
          })}
        </div>

    </div>
    `;
}

window.updateCharacterCount = function () {
  const input = document.getElementById("pseudo");
  const characterCount = document.querySelector(
    ".inputContainer span:last-child",
  );
  characterCount.textContent = `${input.value.length}/20 caractères`;

  if (input.value.length > 20) {
    input.value = input.value.slice(0, 20);
  }
};
