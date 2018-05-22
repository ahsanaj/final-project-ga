function setBlackJackWinsText() {
  let message = GAME_DATA.blackjack.wins > 1 ? "games" : "game";
  span_wins.innerText = GAME_DATA.blackjack.wins + " " + message;
  start_btn.style.pointerEvents = "auto";
  start_btn.style.opacity = "1";
  start_btn.innerText = "Start Game";
}
function startButtonClicked(event) {
  disableButton(start_btn);
  event.target.innerText = "Game has started";
  EVTBlackjack.emit("startButtonClicked");
}
function hitButtonClicked(event) {
  disableButton(hit_btn);
  disableButton(stand_btn);
  EVTBlackjack.emit("hitButtonClicked");
}
function standButtonClicked(event) {
  disableButton(stand_btn);
  disableButton(hit_btn);
  EVTBlackjack.emit("standButtonClicked");
}
function nextRoundButtonClicked() {
  blackjack_game.style.left = "-100%";
  trivia_game.style.left = "0";
}
function restartButtonClicked(event) {
  disableButton(stand_btn);
  disableButton(hit_btn);
  start_btn.style.pointerEvents = "none";
  start_btn.style.opacity = "0.7";
  start_btn.innerText = "Game has started";
  EVTBlackjack.emit("restartButtonClicked");
}
function nextLevelButtonClicked(event) {
  blackjack_game.style.left = "-100%;";
  trivia_game.style.left = "0";
}
function instructionButtonClicked(event) {
  const message = `<p>Blackjack is a casino banked game, meaning that players compete against the house rather than each other. The objective is to get a hand total of closer to 21 than the dealer without going over 21 (busting)</p>
  <p>At the start of a Blackjack game, the players and the dealer receive two cards each. The players' cards are normally dealt face up, while the dealer has one face down (called the hole card) and one face up. The best possible Blackjack hand is an opening deal of an ace with any ten-point card.</p>
  <p>When playing Blackjack the numeral cards 2 to 10 have their face values, Jacks, Queens and Kings are valued at 10, and Aces can have a value of either 1 or 11. The Ace is always valued at 11 unless that would result in the hand going over 21, in which case it is valued as 1.</p>
  <p><strong>Stand</strong> – If the player is happy with the total they’ve been dealt they can stand, taking no further action and passing to the next player. The player can take this action after any of the other player actions as long as their hand total is not more than 21. The hand signal to Stand is waving a flat hand over the cards</p>
  <p><strong>Hit</strong> – If the player wishes to take another card they signal to the dealer to by scratching the felt beside their hand or pointing to their hand. A single card is then played face up onto their hand. If the hand total is less than 21 the player can choose to Hit again or Stand. If the total is 21 the hand automatically stands. If the total is over 21 the hand is bust, the player’s bet is taken by the house and the turn to act passes to the next player.</p>`;

  EVTBlackjack.emit("blackjackInstructionsButtonClicked", message);
}
function modalCloseInstructionsClicked() {
  EVTBlackjack.emit("modalCloseInstructionsClicked");
}
function backButtonClicked() {
  EVTBlackjack.emit("backButtonClicked");
  start_btn.style.pointerEvents = "auto";
  start_btn.style.opacity = "1";
  start_btn.innerText = "Start Game";
  blackjack_game.style.left = "100%";
  main_page.style.left = "0";
}
function disableButton(el) {
  el.style.opacity = "0.5";
  el.style.pointerEvents = "none";
}
function enableButton(el) {
  el.style.opacity = "1";
  el.style.pointerEvents = "auto";
}

function init() {
  blackjack_game = document.querySelector("#blackjack-game");
  blackjack_instructions = blackjack_game.querySelector(
    ".blackjack-instructions"
  );
  modal_instructions_close = blackjack_game.querySelector(".modal-close");
  start_btn = blackjack_game.querySelector("#start-btn");
  hit_btn = blackjack_game.querySelector("#hit-btn");
  stand_btn = blackjack_game.querySelector("#stand-btn");
  restart_btn = blackjack_game.querySelector("#restart-btn");
  next_level_btn = blackjack_game.querySelector("#next-level-btn");
  back_btn = blackjack_game.querySelector(".go-back-main-page");
  span_wins = blackjack_game.querySelector(".wins");
  trivia_game = document.querySelector("#trivia-game");
  next_round_btn = document.querySelector("#next-round-btn");
  main_page = document.querySelector("#main-page");

  disableButton(stand_btn);
  disableButton(hit_btn);

  blackjack_instructions.addEventListener("click", instructionButtonClicked);
  modal_instructions_close.addEventListener(
    "click",
    modalCloseInstructionsClicked
  );
  start_btn.addEventListener("click", startButtonClicked);
  hit_btn.addEventListener("click", hitButtonClicked);
  stand_btn.addEventListener("click", standButtonClicked);
  restart_btn.addEventListener("click", restartButtonClicked);
  next_level_btn.addEventListener("click", nextLevelButtonClicked);
  next_round_btn.addEventListener("click", nextRoundButtonClicked);
  back_btn.addEventListener("click", backButtonClicked);

  setBlackJackWinsText();
}

EVTBlackjack.on("setBlackJackWinsText", setBlackJackWinsText);

EVTBlackjack.on("playerInitialCardsLoaded", function() {
  enableButton(stand_btn);
  enableButton(hit_btn);
});

EVTBlackjack.on("init", init);

let start_btn,
  hit_btn,
  stand_btn,
  restart_btn,
  next_round_btn,
  span_wins,
  blackjack_game,
  trivia_game,
  blackjack_instructions,
  modal_instructions_close,
  next_level_btn,
  back_btn,
  main_page;
