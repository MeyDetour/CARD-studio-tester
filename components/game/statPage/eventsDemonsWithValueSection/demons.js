import { getTextualValueOfCard } from "../../../../src/controller/game/cards.js";
import { getGainIdOfGainString } from "../../../../src/helpers/string.js";
import { formatSimpleDate } from "../../../../src/helpers/date.js";
export default function statEventsDemonsWithValueSectionDemonSection(gameData) {
  let data = gameData.data?.testLogs
    .filter(
      (log) => 
        log.testType == "demon" 
    )
    ?.reverse();
  return ` 
         ${data
           .map((log, index) => {
             if (log.testType == "demon") {
               let demon = log;
               return /*html */ `
                     <details class="elementDetails">
                        <summary ${index === 0 ? "style='padding-bottom: 24px;'" : ""}>
                           <img src="/assets/violet-right-arrow.svg" alt="Arrow Icon">
                           <span>${demon.name}</span>
                           ${index === 0 ? "<span class='tooltip'>(Dernier démon)</span>" : ""}
                        </summary>
                        <div class="elementContent">
                           <div class="elementDetail">
                              <span style="font-weight: bold;">Détails du démon</span>
                              <div class="detailWrapper">
                                  ${demon.boucle ? `<div class="rowInWrapper"><span>Boucle :</span><span>${demon.boucle}</span></div>` : ""}
                                 ${demon.condition ? `<div  class="rowInWrapper"><span>Condition :</span><span>${demon.condition}</span></div>` : ""}
                            
                              </div>
                           </div>
                           

                           <div class="metadonnéeDetail">
                              <span style="font-weight: bold;">Métadonnées</span>
                              <div class="detailWrapper">
                                  <div class="rowInWrapper"><span>Ordre d'éxécution :</span><span>${data.length - index}</span></div>
                                  <div class="rowInWrapper"><span>Date :</span><span>${formatSimpleDate(log.executionDate)}</span></div>
                                 
                              </div>
                           </div> 

                           ${
                             demon.events && demon.events.length > 0
                               ? /*html*/ `
                              <div class=" ">
                                 <span style="font-weight: bold;">Événement(s) appellé(s)</span>
                                 <div class="detailWrapper">
                                    ${demon.events
                                      .map(
                                        (eventId, index) => /*html*/ `
                                       <div class="rowInWrapper"><span>Ordre ${index + 1} :</span><span>${gameData.roomInDb.events.events.find((event) => event.id === eventId)?.name || "Unknown Event"}</span></div>
                                    `,
                                      )
                                      .join("")}  
                                 </div>
                              </div> 
                           `
                               : ""
                           }
                        </div>
                     </details>
                     `;
             } 
           })
           .join("")}
   `;
}
