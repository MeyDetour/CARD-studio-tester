import { spookySkins } from "../../../data/spookySkins.js";

export function isPassifPlayer(player) {
  return (
    player.isSpectator?.value || player.haswin?.value || player.hasloose?.value
  );
}  

export function addPlayer() {
  const newPlayer = {

  }
  window.players = [player];
}
export function getRandomSkin(){
  let index = Math.floor(Math.random() * spookySkins.length);
  return spookySkins.splice(index, 1)[0];
}