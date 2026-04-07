import { getCurrentPlayer } from "../../src/controller/game/dataStorage.js";

export function playerCard(admin, player) {
  let currentPlayer = getCurrentPlayer();

  if (!player) {
    console.warn("please provide player to playerCard");
    return;
  }
  if (!player.id) {
    console.warn("please provide id to playerCard");
    return;
  }
  if (!player.pseudo) {
    console.warn("please provide pseudo to playerCard");
    return;
  }

  return /*html */ `
         <div class="playerCard">
              ${
                player.skin ? (
                  `<div class="skin-container"><img src="/assets/images/spooky-skins/${player.skin}.png" alt="Skin de ${player.pseudo}" class="player-skin"></div>`
                ) : (
                  `<div class="letter">${player.pseudo.charAt(0)}</div>`
                )
              }
               <div>

                <span class="pseudo">${player.pseudo} ${currentPlayer.id == player.id ? "(vous)" : ""}</span>
                ${admin.id === player.id ? "<span>Hôte</span>" : ""}
                </div>
            </div>
  `;
}
