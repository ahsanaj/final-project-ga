function getLocalStorageGameData() {
  return JSON.parse(localStorage.getItem("game_data"));
}

if (getLocalStorageGameData()) {
  GAME_DATA = getLocalStorageGameData();
}
