function _turnDataIntoJSON(response) {
  return response.json();
}
function fetchCards(deck_id, noOfCards) {
  const baseURL = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${noOfCards}`;
  return fetch(baseURL, httpOptions).then(_turnDataIntoJSON);
}
function shuffleDeck(deck_id) {
  const baseURL = `https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`;
  return fetch(baseURL, httpOptions).then(_turnDataIntoJSON);
}
function fetchDeck() {
  const baseURL = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
  return fetch(baseURL, httpOptions).then(_turnDataIntoJSON);
}

EVTBlackjack.on("restartButtonClicked", function() {
  shuffleDeck(deck_id).then(function() {
    fetchCards(deck_id, 2).then(function(cards) {
      EVTBlackjack.emit("computerInitialCardsFetched", cards);
    });
  });
});

EVTBlackjack.on("computerDrawCardAgain", function() {
  console.log("drawing");
  fetchCards(deck_id, 1).then(function(cards) {
    EVTBlackjack.emit("computerDrawCardFetched", cards);
  });
});

EVTBlackjack.on("hitButtonClicked", function() {
  fetchCards(deck_id, 1).then(function(cards) {
    EVTBlackjack.emit("playerHitCardFetched", cards);
  });
});

EVTBlackjack.on("computerInitialCardsLoaded", function() {
  fetchCards(deck_id, 2).then(function(cards) {
    EVTBlackjack.emit("playerInitialCardsFetched", cards);
  });
});

EVTBlackjack.on("startButtonClicked", function() {
  fetchCards(deck_id, 2).then(function(cards) {
    EVTBlackjack.emit("computerInitialCardsFetched", cards);
  });
});

EVTBlackjack.on("getDeckID", function(ID) {
  deck_id = ID;
});

EVTBlackjack.on("deckDoesntExist", function() {
  fetchDeck().then(data => {
    EVTBlackjack.emit("deckFetched", data);
  });
});

const httpOptions = { method: "GET" };

let deck_id;
