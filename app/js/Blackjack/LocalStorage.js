function getDeckIDLocalStorage() {
  return JSON.parse(localStorage.getItem("game_data")).blackjack.deck_id;
}

function setDeckIDLocalStorage(deck_id) {
  localStorage.setItem("game_data", JSON.stringify(GAME_DATA));
}

function init() {
  deck_id = getDeckIDLocalStorage();
  //console.log(deck_id);
  if (getDeckIDLocalStorage() === null) {
    EVTBlackjack.emit("deckDoesntExist");
  } else {
    EVTBlackjack.emit("getDeckID", deck_id);
  }
}

EVTBlackjack.on("deckFetched", function(data) {
  setDeckIDLocalStorage(data.deck_id);
  deck_id = getDeckIDLocalStorage();
  EVTBlackjack.emit("getDeckID", deck_id);
});

EVTBlackjack.on("init", init);

let deck_id;
