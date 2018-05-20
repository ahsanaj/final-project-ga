import "../css/styles.css";

const EventEmitter2 = require("eventemitter2");
window.EVTBlackjack = new EventEmitter2();
window.EVTTrivia = new EventEmitter2();

require("../js/Blackjack/index.js");
require("../js/Trivia/index.js");

let main_page,
  main_page_modal,
  main_page_modal_heading,
  main_page_modal_instructions,
  main_page_modal_close,
  main_page_modal_play_btn,
  game_data;

window.addEventListener("DOMContentLoaded", function() {
  // const popup = document.querySelector("#myPopup");
  // popup.addEventListener("click", function(event) {
  //   popup.style.visibility = "visible";
  //   console.log("hey");
  // });

  EVTBlackjack.emit("init");
  EVTTrivia.emit("init");

  main_page = document.querySelector("#main-page");
  main_page_modal = main_page.querySelector(".modal");
  main_page_modal_heading = main_page.querySelector(".modal-heading");
  main_page_modal_instructions = main_page.querySelector(".modal-instructions");
  main_page_modal_close = main_page.querySelector(".modal-close");
  main_page_modal_play_btn = main_page_modal.querySelector(".btn");

  if (localStorage.getItem("game_data")) {
    game_data = JSON.parse(localStorage.getItem("game_data"));
    console.log(game_data);
    if (game_data.currentLevel === 2) {
      console.log("hey");
      main_page.querySelector(".start-trivia").style.opacity = "1";
      main_page.querySelector(".start-trivia span").innerText =
        "Level 2 Trivia";
    }
  }

  const blackjack_game = document.querySelector("#blackjack-game");

  const trivia_game = document.querySelector("#trivia-game");
  main_page.addEventListener("click", function(event) {
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
          hideModal();
          main_page.style.left = "-100%";
          blackjack_game.style.left = "0";
        });
        showModal();
      } else if (
        event.target.getAttribute("class") === "start-trivia level-circle" ||
        event.target.parentNode.getAttribute("class") ===
          "start-trivia level-circle"
      ) {
        main_page_modal_play_btn.style.display = "none";
        main_page_modal_heading.innerText = `Level 2 Trivia Game`;
        if (game_data.currentLevel >= 2) {
          main_page_modal_play_btn.style.display = "inline-block";
          main_page_modal_play_btn.addEventListener("click", function(event) {
            hideModal();
            main_page.style.left = "-100%";
            trivia_game.style.left = "0";
          });
        } else {
          main_page_modal_instructions.innerHTML = `This level is locked. <br><br>Please complete Level 1 to unlock this level.`;
        }
        showModal();
      } else if (
        event.target.getAttribute("class") === "start-fruit level-circle" ||
        event.target.parentNode.getAttribute("class") ===
          "start-fruit level-circle"
      ) {
        main_page_modal_play_btn.style.display = "none";
        main_page_modal_heading.innerText = `Level 3 Fruit Shooting Game`;
        main_page_modal_instructions.innerHTML = `This level is locked. <br><br>Please complete Level 2 to unlock this level.`;
        showModal();
      }
    }
  });
  main_page_modal_close.addEventListener("click", hideModal);
});

function hideModal() {
  main_page_modal.style.opacity = "0";
  setTimeout(function() {
    main_page_modal.style.display = "none";
  }, 500);
}
function showModal() {
  main_page_modal.style.display = "block";
  setTimeout(function() {
    main_page_modal.style.opacity = "1";
  }, 50);
}
