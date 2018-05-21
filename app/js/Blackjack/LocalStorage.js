function getDeckIDLocalStorage() {
  return localStorage.getItem("deck_id");
}

function setDeckIDLocalStorage(deck_id) {
  localStorage.setItem("deck_id", deck_id);
}

deck_id = getDeckIDLocalStorage();

if (!getDeckIDLocalStorage()) {
  console.log("not");
  EVTBlackjack.emit("deckDoesntExist");
} else {
  EVTBlackjack.emit("getDeckID", deck_id);
}

EVTBlackjack.on("deckFetched", function(data) {
  setDeckIDLocalStorage(data.deck_id);
  deck_id = getDeckIDLocalStorage();
  EVTBlackjack.emit("getDeckID", deck_id);
});

let deck_id;
