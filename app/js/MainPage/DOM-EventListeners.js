function setMainPageClickEventListener(event) {
  if (event.target.nodeName === "DIV" || event.target.nodeName === "SPAN") {
    if (
      event.target.getAttribute("class") === "start-blackjack level-circle" ||
      event.target.parentNode.getAttribute("class") ===
        "start-blackjack level-circle"
    ) {
      main_page_modal_play_btn.style.display = "inline-block";
      main_page_modal_heading.innerText = event.target.innerText;
      main_page_modal_instructions.innerHTML = ``;
      main_page_modal_play_btn.addEventListener("click", function(event) {
        EVTMainPage.emit("hideModal");
        main_page.style.left = "-100%";
        blackjack_game.style.left = "0";
      });
      EVTMainPage.emit("showModal");
    } else if (
      event.target.getAttribute("class") === "start-trivia level-circle" ||
      event.target.parentNode.getAttribute("class") ===
        "start-trivia level-circle"
    ) {
      main_page_modal_heading.innerText = `Level 2 Trivia Game`;
      if (!GAME_DATA.level2_locked) {
        main_page_modal_play_btn.style.display = "inline-block";
        main_page_modal_play_btn.addEventListener("click", function(event) {
          EVTMainPage.emit("hideModal");
          main_page.style.left = "-100%";
          trivia_game.style.left = "0";
        });
      } else {
        let message = GAME_DATA.blackjack_wins > 1 ? "games" : "game";
        main_page_modal_instructions.innerHTML = `This level is locked. <br><br>Please complete Level 1 by winning ${total_wins_needed -
          GAME_DATA.blackjack_wins} blackjack ${message} to unlock this level.`;
        main_page_modal_play_btn.style.display = "none";
      }
      EVTMainPage.emit("showModal");
    } else if (
      event.target.getAttribute("class") === "start-fruit level-circle" ||
      event.target.parentNode.getAttribute("class") ===
        "start-fruit level-circle"
    ) {
      main_page_modal_play_btn.style.display = "none";
      main_page_modal_heading.innerText = `Level 3 Fruit Shooting Game`;
      main_page_modal_instructions.innerHTML = `This level is locked. <br><br>Please complete Level 2 to unlock this level.`;
      EVTMainPage.emit("showModal");
    }
  }
}

function init() {
  main_page = document.querySelector("#main-page");
  main_page_modal = main_page.querySelector(".modal");
  main_page_modal_heading = main_page.querySelector(".modal-heading");
  main_page_modal_instructions = main_page.querySelector(".modal-instructions");
  main_page_modal_close = main_page.querySelector(".modal-close");
  main_page_modal_play_btn = main_page_modal.querySelector(".btn");

  blackjack_game = document.querySelector("#blackjack-game");
  trivia_game = document.querySelector("#trivia-game");

  main_page_modal_close.addEventListener("click", function() {
    EVTMainPage.emit("hideModal");
  });
  main_page.addEventListener("click", setMainPageClickEventListener);
}

EVTMainPage.on("init", init);

let main_page;
let main_page_modal;
let main_page_modal_heading;
let main_page_modal_instructions;
let main_page_modal_close;
let main_page_modal_play_btn;
let blackjack_game;
let trivia_game;
let total_wins_needed = 3;
