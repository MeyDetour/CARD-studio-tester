import { getTextualValueOfCard } from "../../../../src/controller/game/cards.js";
export default function statEventsDemonsWithValueSectionLogsSection(gameData) {
  return ` 
  ${gameData.data.logs.map((message) => /*html */ `<span>${message}</span>`).join("")}
 
  `;
}
