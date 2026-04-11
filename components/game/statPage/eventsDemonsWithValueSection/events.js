import { getTextualValueOfCard } from "../../../../src/controller/game/cards.js"
export default function statEventsDemonsWithValueSectionEventSection(gameData){
 
    return ` 
         ${gameData.data?.eventsTestLog?.map((event) => /*html */ `
            <div class="event">
                  <span>${event.name}</span>
            </div>
            `).join("")}
   `
}
