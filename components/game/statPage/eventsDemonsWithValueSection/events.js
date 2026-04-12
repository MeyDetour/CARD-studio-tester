import { getTextualValueOfCard } from "../../../../src/controller/game/cards.js";
import { getGainIdOfGainString } from "../../../../src/helpers/string.js";
import { formatSimpleDate } from "../../../../src/helpers/date.js";
export default function statEventsDemonsWithValueSectionEventSection(gameData) {
 let data = gameData.data?.testLogs
           .filter((log) => log.testType == "event" || log.testType == "demon" || log.testType == "withValue")
           ?.reverse()
   return ` 
         ${
           data.map((log, index) => {
             if (log.testType == "event" || log.testType == "withValue") {
               let event = log; 
               return /*html */ `
                     <details class="elementDetails">
                        <summary ${index === 0 ? "style='padding-bottom: 24px;'" : ""}>
                           <img src="/assets/violet-right-arrow.svg" alt="Arrow Icon">
                           <span>${event.name}</span>
                           ${index===0 ? "<span class='tooltip'>(Dernier événement)</span>" : ""}
                        </summary>
                        <div class="elementContent">
                           <div class="elementDetail">
                              <span style="font-weight: bold;">Détails de l'événement</span>
                              <div class="detailWrapper">
                                  ${event.boucle ? `<div class="rowInWrapper"><span>Boucle :</span><span>${event.boucle}</span></div>` : ""}
                                 ${event.condition ? `<div  class="rowInWrapper"><span>Condition :</span><span>${event.condition}</span></div>` : ""}
                                 ${event.event.condition ? `<div  class="rowInWrapper"><span>Condition dans la boucle :</span><span>${event.event.condition}</span></div>` : ""}
                                 ${
                                   event.event.give
                                     ? Object.keys(event.event.give)
                                         .map((string) =>
                                           string.includes("gain#")
                                             ? `<div  class="rowInWrapper"><span>Don de ${gameData.data.gains.find((elt) => elt.id == getGainIdOfGainString(string))?.name} :</span><span>${event.event.give[string]}</span></div>`
                                             : string.includes("cards")
                                             ? `<div  class="rowInWrapper"><span>Don de cartes :</span><span>${event.event.give[string]}</span></div>`
                                             : `<div  class="rowInWrapper"><span>Don de ${string} :</span><span>${event.event.give[string]}</span></div>`
                                             
                                         )
                                         .join("")
                                     : ""
                                 }
                                 ${event.event.from ? `<div  class="rowInWrapper"><span>Source :</span><span>${event.event.from}</span></div>` : ""}
                                 ${event.event.for ? `<div  class="rowInWrapper"><span>Cible :</span><span>${event.event.for}</span></div>` : ""}
                                 ${event.event.action ? `<div  class="rowInWrapper"><span>Action :</span><span>${event.event.action}</span></div>` : ""}
                                 ${event.event.value !== undefined && event.event.value !== null ? `<div  class="rowInWrapper"><span>Valeur :</span><span>${event.event.value}</span></div>` : ""}
                                 ${event.loadMessage ? `<div  class="rowInWrapper"><span>Message :</span><span>${event.loadMessage}</span></div>` : ""}
                                 
                              </div>
                           </div>
                           ${
                             event.diffs.length > 0
                               ? /* html*/ `
                           <div class="modificationDetail">
                              <span style="font-weight: bold;">Détails de l'événement</span>
                             
                              <div class="detailWrapper">
                              ${event.diffs.map(
                                (diff) => /* html*/ `
                                 <div class="diffDetail">
                                     <span>${diff.key}</span>
                                      ${diff.message ? `<p>${diff.message}</p>` : ""}
                                     <div>
                                       <span class="beforeValue">${ (diff.type.includes("array")|| diff.type.includes("List")  )&& diff.before.length=="0" ? "Liste de vide" :  diff.type == "cardList" ? diff.before.map((id) => getTextualValueOfCard(gameData.roomInDb.assets.cards[id])).join(", ") :diff.before}</span>
                                       <img src="/assets/grey-right-arrow.svg" alt="Arrow Icon">
                                       <span class="afterValue">${ (diff.type.includes("array")|| diff.type.includes("List")  )&& diff.after.length=="0" ? "Liste de vide" :  diff.type == "cardList" ? diff.after.map((id) => getTextualValueOfCard(gameData.roomInDb.assets.cards[id])).join(", ") :diff.after}</span>
                                     </div>
                                 </div>
                                `
                              ).join("")}
                              </div>
                           </div> 
                           `
                               : ""
                           }

                           <div class="metadonnéeDetail">
                              <span style="font-weight: bold;">Métadonnées</span>
                              <div class="detailWrapper">
                                  <div class="rowInWrapper"><span>Ordre d'éxécution :</span><span>${data.length -  index}</span></div>
                                  <div class="rowInWrapper"><span>Date :</span><span>${formatSimpleDate(log.executionDate)}</span></div>
                                 
                              </div>
                           </div> 

                           ${event.event?.withValue && event.event?.withValue.length > 0 ? /*html*/ `
                              <div class=" ">
                                 <span style="font-weight: bold;">Événement(s) appellé(s)</span>
                                 <div class="detailWrapper">
                                    ${event.event.withValue.map((withValueEventObject,index) => /*html*/ `
                                       <div class="rowInWrapper"><span>Ordre ${index+1} :</span><span>${gameData.roomInDb.events.withValueEvent.find(event => event.id === withValueEventObject.id)?.name || "Unknown Event"}</span></div>
                                    `).join("")}  
                                 </div>
                              </div> 
                           ` : ""}
                        </div>
                     </details>
                     `;
             }
             if (log.testType == "demon") {
               let demon = log;
               return /*html */ `
                  <div class="demonLine"><hr> <span>Démon : ${demon.name}</span> <hr></div>
                  `;
             }
           })
           .join("")}
   `;
}
