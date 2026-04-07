 /*
    displayOtherPlayerCount: boolean to determine if the number of cards in the other players' hands should be displayed. This is useful for games where players have hidden hands, and it adds an element of strategy and suspense to the game. By showing the card count, players can make informed decisions based on how many cards their opponents have left, which can influence their gameplay choices.
    player: the player object containing information about the player, such as their pseudo, id, handDeck, etc.
    key: a unique identifier for the player, often used in rendering lists of players to help with efficient updates and rendering in frameworks like React.
    isCurrentPlayerTurn: a boolean indicating whether it is currently this player's turn, which can be used to highlight the player's identity container or provide visual cues to indicate that it's their turn.
    totalPlayerCount: the total number of players in the game, which can be used for styling purposes (e.g., adjusting the layout based on the number of players).
*/

export function gameplay_identityContainer(
  player,params
) { 
  return /*html */ `
            <div  data-player-id="${player.id}" class="player player${params.key} playerCount${params.totalPlayerCount}  ${params.isCurrentPlayerTurn ? "currentPlayerTurn" : ""} ${params.className ? params.className : ""}">               
               ${params.dislayCardCount ? /*html */ `<div class="cardCount-stat"><img src="/assets/cards-count.svg" alt="Cartes"> <span>${player.handDeck.value.length}</span></div>` : ""}
                   
                <div class="playerImageContainer ${player.skin ? "withSkin" : ""}">
                    <img src="${player.skin ?"/assets/images/spooky-skins/"+ player.skin+".png" : "/assets/images/template-player.png"}" alt="avatar" />
                </div>
                <div class="globalValue">
                  ${Object.keys(player).map(key=>{
                    if(typeof player[key].value !== "undefined" && player[key].display ){
                      
                      return /*html */ `<span >${key} : ${player[key].value}</span>`;
                    }
                    return "";  
                  }).join("")}
                    
                </div>
              
                <div class="rightStatContainer">
                    <span class="pseudo">${player.pseudo}</span>   
                   ${
                      params.displayPoints && params.gainList && params.gainList.length > 0
                        ? params.gainList
                            .map(
                              (gain) =>
                                /*html */ `<div class="gain"><img src="${gain.image ? gain.image :"/assets/unknown-gain.svg"}" alt="Gain"><span >${player.gain.value[gain.id].value}</span></div>`,
                            )
                            .join("")
                        : ""
                    } 
                    ${
                      player.roles && player.roles.value.length > 0
                        ? player.roles.value
                            .map(
                              (role) =>
                                /*html */ `<div class="role"><img src="${role.image ? role.image :"/assets/unknown-role.svg"}" alt="Role"><span >${role.name}</span></div>`,
                            )
                            .join("")
                        : ""
                    } 
                </div>
            </div>`;
}
