import { button } from "../../components/button/button.js";
import { getGameData } from "../../src/controller/game/dataStorage.js";
import { players } from "../../src/main.js";
import { connectSocket } from "../../src/websocket/connection.js";
export function testConfigPage(params = {}) {
  let gameData = getGameData();
  let players = gameData?.data?.players || [];
  if (!players) {
    console.warn("Sockets not initialized yet, redirecting to loading page");
    return;
  }

  return /*html*/ `  <div class="testConfigPage">
          <div class="head" >
              <h2>${gameData.roomInDb.name}</h2> 
          </div> 
          <div class="row">
            <div class="left">
              <h3>Joueurs (${players.length})</h3>
                <div class="playerWrapper">
                  ${players
                    .map((player, index) => {
                      console.log(player);
                      return /*html*/ `
                        <div class="playerConfig">
                            <div class="imageContainer">
                                <img src="/assets/images/spooky-skins/${player.skin.name}.png"/>
                            </div>
                            <div>
                              <h4>${player.pseudo}</h4>
                              ${
                                gameData.admin.id !== player.id
                                  ? button(
                                      null,
                                      null,
                                      null,
                                      "disconnectSocket",
                                      "Remove",
                                      "linkApparence",
                                      { index: index },
                                    )
                                  : ""
                              }
                            </div>
                        </div>
                        `;
                    })
                    .join("")}
                    
                      ${
                        gameData.roomInDb.params.globalGame.maxPlayer >
                        players.length
                          ? button(
                              "add-grey",
                              null,
                              null,
                              "connectSocket",
                              "Add player",
                              "addButton",
                            )
                          : ""
                      }  
                </div>
            </div>
            <div class="right">
            <h3>Paramètres du jeu</h3>
              <div class="explicationSection">
                <p>
                  Max : ${gameData.roomInDb.params.globalGame.maxPlayer}
                  Min : ${gameData.roomInDb.params.globalGame.minPlayer}

                </p>
              </div>
                ${
                  gameData.roomInDb.params.globalGame.minPlayer <=
                  gameData.data.players.length
                    ? button(
                        null,
                        null,
                        null,
                        "startGame",
                        "Lancer la partie",
                        "violetButton",
                      )
                    : "En attente de joueurs..."
                }
          
            </div>
            
          </div>
        </div>

    </div>
    `;
}

function updateCharacterCount() {
  const input = document.getElementById("pseudo");
  const characterCount = document.querySelector(
    ".inputContainer span:last-child",
  );
  characterCount.textContent = `${input.value.length}/20 caractères`;

  if (input.value.length > 20) {
    input.value = input.value.slice(0, 20);
  }
}
window.updateCharacterCount = updateCharacterCount;
