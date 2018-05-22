function saveGame() {
  localStorage.setItem("game_data", JSON.stringify(GAME_DATA));
}
function loadGame() {
  GAME_DATA = getLocalStorageGameData();
}
function getLocalStorageGameData() {
  return JSON.parse(localStorage.getItem("game_data"));
}

function init() {
  if (!getLocalStorageGameData()) {
    saveGame();
  } else {
    loadGame();
  }
}
EVTGlobal.on("saveGame", saveGame);

EVTGlobal.on("init", init);
