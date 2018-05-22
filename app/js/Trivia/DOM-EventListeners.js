function exitButtonClicked() {
  submit_btn.style.opacity = "1";
  submit_btn.innerText = "Start";
}
function backButtonClicked() {
  trivia_game.style.left = "100%";
  blackjack_game.style.left = "100%";
  main_page.style.left = "0";
}
function playTriviaAgainClicked() {
  category_select.value = "";
  difficulty_select.value = "";
  submit_btn.style.opacity = "1";
  submit_btn.innerText = "Start";
}
function showErrorMessage() {
  error.style.display = "block";
  error.innerText =
    "This category is currently unavailable, please choose a different category";
  submit_btn.style.opacity = "1";
  submit_btn.innerText = "Start";
}

function setTriviaGameClickEventListener(event) {
  EVTTrivia.emit("triviaGameContainerClicked", event);
}
function triviaFormSubmit(event) {
  event.preventDefault();
  submit_btn.style.opacity = "0.7";
  submit_btn.innerText = "Starting...";
  const params = {
    category: category_select.value,
    difficulty: difficulty_select.value
  };
  EVTTrivia.emit("startButtonClicked", params);
}

function init() {
  blackjack_game = document.querySelector("#blackjack-game");
  trivia_game = document.querySelector("#trivia-game");
  form = trivia_game.querySelector("form");
  category_select = form.querySelector("#trivia-category");
  difficulty_select = form.querySelector("#trivia-difficulty");
  submit_btn = form.querySelector("button[type='submit']");
  error = form.querySelector("em.error");
  back_btn = trivia_game.querySelector(".go-back-main-page");
  main_page = document.querySelector("#main-page");

  form.addEventListener("submit", triviaFormSubmit);
  trivia_game.addEventListener("click", setTriviaGameClickEventListener);
  back_btn.addEventListener("click", backButtonClicked);
}

EVTTrivia.on("exitButtonClicked", exitButtonClicked);

EVTTrivia.on("playTriviaAgainClicked", playTriviaAgainClicked);

EVTTrivia.on("fetchFailed", showErrorMessage);

EVTTrivia.on("init", init);

let blackjack_game,
  trivia_game,
  form,
  category_select,
  difficulty_select,
  submit_btn,
  error,
  back_btn,
  main_page;
