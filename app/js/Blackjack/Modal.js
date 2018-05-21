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

function init() {
  blackjack_game = document.querySelector("#blackjack-game");

  modal_game = blackjack_game.querySelector(".modal-game");
  modal_game_content = modal_game.querySelector(".modal-content");
  modal_game_result = modal_game.querySelector(".result");
  modal_game_close = modal_game.querySelector(".modal-close");

  modal_game_close.addEventListener("click", hideModal);

  modal_instructions = blackjack_game.querySelector(
    ".modal.modal-instructions"
  );
  modal_instructions_result = modal_instructions.querySelector(".instructions");
}

EVTBlackjack.on("blackjackInstructionsButtonClicked", function(message) {
  modal_instructions_result.innerHTML = message;
  showInstructionsModal();
});

EVTBlackjack.on("restartButtonClicked", hideModal);

EVTBlackjack.on("gameFinished", function(message) {
  modal_game_result.innerText = message;
  showModal();
});

EVTBlackjack.on("init", init);

let blackjack_game;
let modal_game;
let modal_game_content;
let modal_game_result;
let modal_game_close;
let modal_instructions;
let modal_instructions_result;
