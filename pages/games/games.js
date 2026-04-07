import { headerComponent } from '../../components/header/header.js'
import { button } from '../../components/button/button.js'
import { apiClient } from '../../src/helpers/api.js';

export async function gamesPage(params = {}) {
  let games = [];
  let gamesHtml = "";
  
  

  try {
    games = await apiClient("games", null, { }); 
    if (!games || !Array.isArray(games)) {
      games = [];
    }
  } catch (err) {}

  if (games) {
    for (let game of games) {
      gamesHtml += /*html */ `
        <div class="gameElement">
            <img src="${game.image ? game.image : "/assets/images/template-game.png"}">
            <div>
                <h3>${game.name}</h3> 
                <p>${game.description.length > 200 ? game.description.substring(0, 197) + "..." : game.description}</p>
                <div class="bottomContainer">
                    <div class="case">
                        <img src="/assets/players-icon.svg">
                        <div>
                            <span class="name">JOUEURS</span>
                            <span>${game.params.globalGame.minPlayer}-${game.params.globalGame.maxPlayer}</span>
                        </div>
                    </div>
                    <div class="case">
                        <img src="/assets/clocks-icon.svg">
                        <div>
                            <span class="name">DUREE</span>
                            <span>10-20 min</span>
                        </div>
                    </div>
                    ${button(null, "right-arrow", null, "gameLogin", "Créer une partie", "blackButton",{gameId:game.id})}

            </div>
            </div>
        </div>
        `;
    }
  }
  return /*html*/ `  <div class="gamesPage">
          ${headerComponent()}

          <div class="wrapper">
            ${gamesHtml}
          </div>
       
    </div>
    `;
}
 
