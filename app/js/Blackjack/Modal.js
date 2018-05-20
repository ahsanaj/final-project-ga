function showModal() {
  modal_game.style.display = "block";
  setTimeout(function() {
    modal_game.style.opacity = "1";
  }, 50);
}
function hideModal() {
  modal_game.style.opacity = "0";
  setTimeout(function() {
    modal_game.style.display = "none";
  }, 500);
}
function showInstructionsModal() {
  modal_instructions.style.display = "block";
  setTimeout(function() {
    modal_instructions.style.opacity = "1";
  }, 50);
}
function hideInstructionsModal() {
  modal_instructions.style.opacity = "0";
  setTimeout(function() {
    modal_instructions.style.display = "none";
  }, 500);
}

EVTBlackjack.on("modalCloseInstructionsClicked", hideInstructionsModal);

EVTBlackjack.on("blackjackLevelCompleted", function(message) {
  modal_game_result.innerText = message;
  showModal();
});

EVTBlackjack.on("blackjackInstructionsButtonClicked", function(message) {
  modal_instructions_result.innerHTML = message;
  showInstructionsModal();
});

EVTBlackjack.on("restartButtonClicked", hideModal);

EVTBlackjack.on("gameFinished", function(message) {
  modal_game_result.innerText = message;
  showModal();
});

const blackjack_game = document.querySelector("#blackjack-game");
const modal_game = blackjack_game.querySelector(".modal-game");
const modal_instructions = blackjack_game.querySelector(
  ".modal.modal-instructions"
);
const modal_game_content = blackjack_game.querySelector(".modal-content");
const modal_game_result = blackjack_game.querySelector(".result");
const modal_instructions_result = modal_instructions.querySelector(
  ".instructions"
);

module.export = { showModal, hideModal };
