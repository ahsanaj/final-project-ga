function level3Unlocked() {
  const level3Div = main_page.querySelector(".start-balloon");
  const level3Span = main_page.querySelector(".start-balloon span");
  level3Div.style.opacity = "1";
  level3Span.innerText = "Level 3 Balloons";
}
function playBlackJack() {
  EVTMainPage.emit("hideModal");
  main_page.style.left = "-100%";
  blackjack_game.style.left = "0";
  GAME_DATA.user_details.current_level = 1;
  EVTGlobal.emit("saveGame");
}
function playTrivia() {
  EVTMainPage.emit("hideModal");
  main_page.style.left = "-100%";
  trivia_game.style.left = "0";
  GAME_DATA.user_details.current_level = 2;
  EVTGlobal.emit("saveGame");
}
function playBalloon() {
  EVTMainPage.emit("hideModal");
  main_page.style.left = "-100%";
  balloon_game.style.left = "0";
  GAME_DATA.user_details.current_level = 3;
  EVTGlobal.emit("saveGame");
  EVTBalloon.emit("startGame");
}
function level2Unlocked() {
  const level2Div = main_page.querySelector(".start-trivia");
  const level2Span = main_page.querySelector(".start-trivia span");

  level2Div.style.opacity = "1";
  level2Span.innerText = "Level 2 Trivia";
}
function balloonLevel3Clicked() {
  modal_playblackjack_btn.style.display = "none";
  modal_playtrivia_btn.style.display = "none";
  modal_playballoon_btn.style.display = "none";

  modal_play_heading.innerText = `Level 3`;

  if (!GAME_DATA.user_details.level3_locked) {
    modal_play_body.innerHTML = "";
    modal_playballoon_btn.style.display = "inline-block";
  } else {
    modal_play_body.innerHTML = `This level is locked. <br><br>Answer 6 questions correct in Trivia to unlock this level.`;
    modal_playballoon_btn.style.display = "none";
  }
  EVTMainPage.emit("showModal");
}
function triviaLevel2Clicked() {
  modal_playblackjack_btn.style.display = "none";
  modal_playtrivia_btn.style.display = "none";
  modal_playballoon_btn.style.display = "none";

  modal_play_heading.innerText = `Level 2`;
  if (!GAME_DATA.user_details.level2_locked) {
    modal_play_body.innerHTML = "";
    modal_playtrivia_btn.style.display = "inline-block";
  } else {
    let message = GAME_DATA.blackjack.wins > 1 ? "game" : "games";
    modal_play_body.innerHTML = `This level is locked. <br><br>Win ${total_wins_needed -
      GAME_DATA.blackjack.wins} blackjack ${message} to unlock this level.`;
    modal_playtrivia_btn.style.display = "none";
  }
  EVTMainPage.emit("showModal");
}
function blackjackLevel1Clicked() {
  modal_playblackjack_btn.style.display = "none";
  modal_playtrivia_btn.style.display = "none";
  modal_playballoon_btn.style.display = "none";
  modal_playblackjack_btn.style.display = "inline-block";
  modal_play_heading.innerText = event.target.innerText;
  modal_play_body.innerHTML = ``;
  EVTMainPage.emit("showModal");
}
function userExists() {
  return GAME_DATA.user_details.name !== "";
}
function submitForm(event) {
  event.preventDefault();
  const name = form.querySelector("#name");
  const email = form.querySelector("#email");

  GAME_DATA.user_details.name = name.value;
  GAME_DATA.user_details.email = email.value;

  EVTMainPage.emit("hideInstructionsModal");

  user_welcome_message.innerText = `Welcome, ${name.value}`;

  EVTGlobal.emit("saveGame");
}
function displayForm() {
  instructions.style.left = "-100%";
  form.style.left = "-50%";
}

function setMainPageClickEventListener(event) {
  if (event.target.nodeName === "DIV" || event.target.nodeName === "SPAN") {
    if (
      event.target.getAttribute("class") === "start-blackjack level-circle" ||
      event.target.parentNode.getAttribute("class") ===
        "start-blackjack level-circle"
    ) {
      blackjackLevel1Clicked();
    } else if (
      event.target.getAttribute("class") === "start-trivia level-circle" ||
      event.target.parentNode.getAttribute("class") ===
        "start-trivia level-circle"
    ) {
      triviaLevel2Clicked();
    } else if (
      event.target.getAttribute("class") === "start-balloon level-circle" ||
      event.target.parentNode.getAttribute("class") ===
        "start-balloon level-circle"
    ) {
      balloonLevel3Clicked();
    }
  }
}

function init() {
  main_page = document.querySelector("#main-page");
  user_welcome_message = main_page.querySelector(".user-welcome");
  modal_play = main_page.querySelector(".modal");
  modal_play_heading = modal_play.querySelector(".modal-heading");
  modal_play_body = modal_play.querySelector(".modal-body");
  modal_play_close = modal_play.querySelector(".modal-close");
  modal_playblackjack_btn = modal_play.querySelector(".play-blackjack-btn");
  modal_playtrivia_btn = modal_play.querySelector(".play-trivia-btn");
  modal_playballoon_btn = modal_play.querySelector(".play-balloon-btn");

  modal_instructions = main_page.querySelector(".modal-instructions");
  instructions = modal_instructions.querySelector(".instructions");
  form = modal_instructions.querySelector(".form");
  modal_instructions_form_btn = modal_instructions.querySelector(".btn-form");

  blackjack_game = document.querySelector("#blackjack-game");
  trivia_game = document.querySelector("#trivia-game");
  balloon_game = document.querySelector("#balloon-game");

  modal_play_close.addEventListener("click", function() {
    EVTMainPage.emit("hideModal");
  });
  main_page.addEventListener("click", setMainPageClickEventListener);

  modal_instructions_form_btn.addEventListener("click", displayForm);

  form.addEventListener("submit", submitForm);

  if (!userExists()) {
    EVTMainPage.emit("showInstructionsModal");
  } else {
    user_welcome_message.innerText = `Welcome, ${GAME_DATA.user_details.name}`;
    if (!GAME_DATA.user_details.level2_locked) {
      level2Unlocked();
    }
    if (!GAME_DATA.user_details.level3_locked) {
      level3Unlocked();
    }
  }

  modal_playblackjack_btn.addEventListener("click", playBlackJack);
  modal_playtrivia_btn.addEventListener("click", playTrivia);
  modal_playballoon_btn.addEventListener("click", playBalloon);
}

EVTMainPage.on("level3Unlocked", level3Unlocked);
EVTMainPage.on("level2Unlocked", level2Unlocked);

EVTMainPage.on("init", init);

let main_page;
let user_welcome_message;
let modal_play;
let modal_play_heading;
let modal_play_body;
let modal_play_close;
let modal_play_btn;
let modal_playblackjack_btn;
let modal_playtrivia_btn;
let modal_playballoon_btn;
let modal_instructions, instructions, form, modal_instructions_form_btn;
let blackjack_game;
let trivia_game;
let balloon_game;
let total_wins_needed = 3;
