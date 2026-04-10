import { getGameData , getView,storeView } from "../../../../../src/controller/game/dataStorage.js";
import statEventsDemonsWithValueSectionEventSection from "./value.js";

export default function gameplay_statEventsDemonsWithValueSection(
  gameData,
  view,
) {
  return /*html*/ `
    <div class="statEventsDemonsWithValueSection-navigation">
                   <span onclick="changeSubpageOfStatEventsDemonsWithValueSection('value')" class="${view.statEventsDemonsWithValue == "value" ? "selected" : ""}">Value</span>
                   <span onclick="changeSubpageOfStatEventsDemonsWithValueSection('events')" class="${view.statEventsDemonsWithValue == "events" ? "selected" : ""}">Events</span>
                   <span onclick="changeSubpageOfStatEventsDemonsWithValueSection('demons')" class="${view.statEventsDemonsWithValue == "demons" ? "selected" : ""}">Demons</span>
                   <span onclick="changeSubpageOfStatEventsDemonsWithValueSection('logs')" class="${view.statEventsDemonsWithValue == "logs" ? "selected" : ""}">Logs</span>
                </div>
                <div class="boxContainer">
                        ${
                          view.statEventsDemonsWithValue == "value"
                            ? statEventsDemonsWithValueSectionEventSection(
                                gameData,
                              )
                            : view.statEventsDemonsWithValue == "events"
                              ? "events"
                              : view.statEventsDemonsWithValue == "demons"
                                ? "<div>Demons</div>"
                                : view.statEventsDemonsWithValue == "logs"
                                  ? gameplay_messageOfLoading(
                                      gameData.data.logs,
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
window.changeSubpageOfStatEventsDemonsWithValueSection = changeSubpageOfStatEventsDemonsWithValueSection;

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
