import { defaultCard } from "../../../defaultCard/defaultCard.js";
import { customCard } from "../../../customCard/customCard.js";
import {
  getCurrentPlayer,
  getGameData,
} from "../../../../src/controller/game/dataStorage.js";
import { displayError } from "../../../../src/controller/error.js";
import { getCardSort } from "../../../../src/controller/game/dataStorage.js";
import { isPassifPlayer } from "../../../../src/controller/game/players.js";


// Separate component for the player's hand deck in the gameplay page
// Separe les cartes du joueurs en plusieurs tas de 11 cartes
// maximum pour éviter les problèmes d'affichage et de superposition
export function gameplay_handdeck(displayHandDeck, handDeck, cardList) {
  if (!displayHandDeck) {
    return "";
  }
  if (!handDeck || handDeck.length === 0) {
    return "";
  }
  if (isPassifPlayer(getCurrentPlayer())) {
    return "";
  }
  let sort = getCardSort();
  let sortedHandDeck = [...handDeck];
  if (sort === "value") {
    sortedHandDeck.sort((a, b) => {
      const cardA = cardList[a];
      const cardB = cardList[b];

      if (!cardA || !cardB) return 0;

      if (
        cardA.value === cardB.value &&
        cardA.type == "french_standard" &&
        cardB.type == "french_standard"
      ) {
        const colorOrder = { coeur: 1, carreau: 2, trefle: 3, pique: 4 };
        return (
          (colorOrder[cardA.addedAttributs.couleur] || 0) -
          (colorOrder[cardB.addedAttributs.couleur] || 0)
        );
      }

      return (cardA.value || 0) - (cardB.value || 0);
    });
  }

  if (sort === "color") {
    const colorOrder = {
      coeur: 1,
      carreau: 2,
      trefle: 3,
      pique: 4,
    };

    sortedHandDeck.sort((a, b) => {
      const cardA = cardList[a];
      const cardB = cardList[b];

      if (cardA.type != "french_standard" || cardB.type != "french_standard")
        return 0;
      if (!cardA || !cardB) return 0;

      const orderA = colorOrder[cardA.addedAttributs.couleur] || 0;
      const orderB = colorOrder[cardB.addedAttributs.couleur] || 0;

      // Si les couleurs sont les mêmes, on trie par valeur
      if (orderA === orderB) {
        return (cardA.value || 0) - (cardB.value || 0);
      }

      return orderA - orderB;
    });
  }

  let html = "";
  const chunkSize = 11;
  const indexMax = Math.ceil(sortedHandDeck.length / chunkSize);

  for (let i = 0; i < sortedHandDeck.length; i += chunkSize) {
    const chunk = sortedHandDeck.slice(i, i + chunkSize);
    const index = Math.floor(i / chunkSize) + 1;

    html += getHandDeck(chunk, cardList, index, indexMax);
  }

  return html;
}
// affiche une rangée de carte
function getHandDeck(cards, cardList, index, max) {
  return /*html */ `
    <div class="handDeck handDeck-${index}" style="z-index: ${max - index}; transform: translate(-50%,-${index * 40}px);">
                      ${cards
                        .map((cardId) => {
                          let carElt = cardList[cardId];
                          carElt.faceUp = true;
                          carElt.hoverable = true;
                          if (carElt.type == "french_standard") {
                            const suits = {
                              coeur: "hearts",
                              carreau: "diamonds",
                              trefle: "clubs",
                              pique: "spades",
                            };

                            carElt.suit =
                              suits[carElt.addedAttributs.couleur] || "";

                            return defaultCard(carElt);
                          } else {
                            return customCard(carElt);
                          }
                        })
                        .join("")}
                </div>
     `;
}
// use to re sort hand deck
export function autoReloadComposant_gameplayHanddeck() {
  let content = document.querySelector("#gameplayPage");
  if (!content) {
    displayError("No content found to reload players");
    return;
  }

  let gameData = getGameData();
  if (!gameData) {
    displayError("No game data found to display game");
    return;
  }

  let currentPlayer = getCurrentPlayer();

  if (!currentPlayer) {
    displayError("No current player found to display game");
    return;
  }
  reloadComposant_gameplayHanddeck(
    content,
    gameData.roomInDb.params.rendering.game.displayHandDeck,
    currentPlayer.handDeck.value,
    gameData.roomInDb.assets.cards,
  );
}

// reload game deck
export function reloadComposant_gameplayHanddeck(
  content,
  displayHandDeck,
  handDeck,
  cardList,
) {
  document.querySelectorAll(".handDeck").forEach((elt) => elt.remove());

  content.innerHTML += gameplay_handdeck(displayHandDeck, handDeck, cardList);
}
