function getDeckIDLocalStorage() {
  return localStorage.getItem("deck_id");
}

function setDeckIDLocalStorage(deck_id) {
  localStorage.setItem("deck_id", deck_id);
}
function saveGameDataLocalStorage(gameData) {
  localStorage.setItem("game_data", JSON.stringify(gameData));
  if (gameData.noOfWins === 3) {
    gameData.currentLevel = 2;
    localStorage.setItem("game_data", JSON.stringify(gameData));
    EVTBlackjack.emit(
      "blackjackLevelCompleted",
      "Good job!, you can now proceed to Level 2"
    );
  }
}
function getGameData() {
  const gameData = JSON.parse(localStorage.getItem("game_data"));
  EVTBlackjack.emit("gameDataFetched", gameData);
}
deck_id = getDeckIDLocalStorage();

if (!getDeckIDLocalStorage()) {
  console.log("not");
  EVTBlackjack.emit("deckDoesntExist");
} else {
  EVTBlackjack.emit("getDeckID", deck_id);
}

EVTBlackjack.on("saveGame", saveGameDataLocalStorage);

EVTBlackjack.on("deckFetched", function(data) {
  setDeckIDLocalStorage(data.deck_id);
  deck_id = getDeckIDLocalStorage();
  EVTBlackjack.emit("getDeckID", deck_id);
});

EVTBlackjack.on("init", getGameData);

let deck_id;
