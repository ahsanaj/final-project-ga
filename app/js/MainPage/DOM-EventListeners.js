function fruitShootingLevel3Clicked() {
  modal_play_btn.style.display = "none";
  modal_play_heading.innerText = `Level 3 Fruit Shooting Game`;
  modal_play_body.innerHTML = `This level is locked. <br><br>Please complete Level 2 to unlock this level.`;
  EVTMainPage.emit("showModal");
}
function triviaLevel2Clicked() {
  modal_play_heading.innerText = `Level 2 Trivia Game`;
  if (!GAME_DATA.level2_locked) {
    modal_play_btn.style.display = "inline-block";
    modal_play_btn.addEventListener("click", function(event) {
      EVTMainPage.emit("hideModal");
      main_page.style.left = "-100%";
      trivia_game.style.left = "0";
    });
  } else {
    let message = GAME_DATA.blackjack_wins > 1 ? "games" : "game";
    modal_play_body.innerHTML = `This level is locked. <br><br>Please complete Level 1 by winning ${total_wins_needed -
      GAME_DATA.blackjack_wins} blackjack ${message} to unlock this level.`;
    modal_play_btn.style.display = "none";
  }
  EVTMainPage.emit("showModal");
}
function blackjackLevel1Clicked() {
  modal_play_btn.style.display = "inline-block";
  modal_play_heading.innerText = event.target.innerText;
  modal_play_body.innerHTML = ``;
  EVTMainPage.emit("showModal");

  modal_play_btn.addEventListener("click", function(event) {
    EVTMainPage.emit("hideModal");
    main_page.style.left = "-100%";
    blackjack_game.style.left = "0";

    GAME_DATA.user_details.current_level = 1;
    EVTGlobal.emit("saveGame");
  });
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
      event.target.getAttribute("class") === "start-fruit level-circle" ||
      event.target.parentNode.getAttribute("class") ===
        "start-fruit level-circle"
    ) {
      fruitShootingLevel3Clicked();
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
  modal_play_btn = modal_play.querySelector(".btn");
  modal_instructions = main_page.querySelector(".modal-instructions");
  instructions = modal_instructions.querySelector(".instructions");
  form = modal_instructions.querySelector(".form");
  modal_instructions_form_btn = modal_instructions.querySelector(".btn-form");

  blackjack_game = document.querySelector("#blackjack-game");
  trivia_game = document.querySelector("#trivia-game");

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
  }
}

EVTMainPage.on("init", init);

let main_page;
let user_welcome_message;
let modal_play;
let modal_play_heading;
let modal_play_body;
let modal_play_close;
let modal_play_btn;
let modal_instructions, instructions, form, modal_instructions_form_btn;
let blackjack_game;
let trivia_game;
let total_wins_needed = 3;
