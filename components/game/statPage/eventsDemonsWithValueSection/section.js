import {
  getGameData,
  getView,
  storeView,
} from "../../../../../src/controller/game/dataStorage.js";
import statEventsDemonsWithValueSectionLogsSection from "./logs.js";
import statEventsDemonsWithValueSectionValueSection from "./value.js";
import statEventsDemonsWithValueSectionEventsSection from "./events.js";
import statEventsDemonsWithValueSectionDemonSection from "./demons.js";

export default function gameplay_statEventsDemonsWithValueSection(
  gameData,
  view,
) {
  return /*html*/ `
    <div class="statEventsDemonsWithValueSection-navigation">
                   <span onclick="changeSubpageOfStatEventsDemonsWithValueSection('value')" class="${view.statEventsDemonsWithValue == "value" ? "selected" : ""}">Variable</span>
                   <span onclick="changeSubpageOfStatEventsDemonsWithValueSection('events')" class="${view.statEventsDemonsWithValue == "events" ? "selected" : ""}">Événements</span>
                   <span onclick="changeSubpageOfStatEventsDemonsWithValueSection('demons')" class="${view.statEventsDemonsWithValue == "demons" ? "selected" : ""}">Démons</span>
                   <span onclick="changeSubpageOfStatEventsDemonsWithValueSection('logs')" class="${view.statEventsDemonsWithValue == "logs" ? "selected" : ""}">Journaux</span>
                </div>
                <div class="boxContainer">
                        ${
                          view.statEventsDemonsWithValue == "value"
                            ? statEventsDemonsWithValueSectionValueSection(
                                gameData,
                              )
                            : view.statEventsDemonsWithValue == "events"
                              ? statEventsDemonsWithValueSectionEventsSection(
                                  gameData,
                                )
                              : view.statEventsDemonsWithValue == "demons"
                                ? statEventsDemonsWithValueSectionDemonSection(
                                    gameData,
                                  )
                                : view.statEventsDemonsWithValue == "logs"
                                  ? statEventsDemonsWithValueSectionLogsSection(
                                      gameData,
                                    )
                                  : ""
                        } 
                        
                </div>
                `;
}
export function changeSubpageOfStatEventsDemonsWithValueSection(subpage) {
  let view = getView();
  view.statEventsDemonsWithValue = subpage;
  storeView(view);
  reloadComposant_gameplay_statEventsDemonsWithValueSection(
    getGameData(),
    view,
  );
}
window.changeSubpageOfStatEventsDemonsWithValueSection =
  changeSubpageOfStatEventsDemonsWithValueSection;

export function reloadComposant_gameplay_statEventsDemonsWithValueSection(
  gameData,
  view,
) {
  let content = document.querySelector(".statEventsDemonsWithValueSection");
  if (content) {
    content.innerHTML = gameplay_statEventsDemonsWithValueSection(
      gameData,
      view,
    );
  }
}
