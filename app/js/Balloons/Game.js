const howler = require("howler");

function startGame() {
  document.body.focus();
  GAME_DATA.user_details.current_level = 3;
  EVTGlobal.emit("saveGame");
  this.style.display = "none";
  heading.style.display = "none";
  displayBalloonsOnScreen();
}
function restartGame() {
  EVTBalloon.emit("restartGame");
  score.innerText = "Score: " + 0;
  displayBalloonsOnScreen();
}

function gameFinished() {
  balloons_container.innerHTML = "";
  clearTimeout(interval);
  GAME_DATA.user_details.game_completed = true;
  SCORE = 0;
  EVTGlobal.emit("saveGame");
  start_balloon_btn.style.display = "inline-block";
  heading.style.display = "block";
}

function backButtonClicked() {
  clearTimeout(interval);
  balloons_container.innerHTML = "";
  balloon_game.style.left = "100%";
  trivia_game.style.left = "100%";
  blackjack_game.style.left = "100%";
  main_page.style.left = "0";
  start_balloon_btn.style.display = "inline-block";
  heading.style.display = "block";
  score.innerText = "Score: " + 0;
  SCORE = 0;
}

function Balloon(data, left) {
  const self = this;
  this.color = data.color;
  this.left = left;
  this.bottom = -395;
  this.create = function() {
    const balloon = document.createElement("div");
    const keyCode = randomIntFromInterval(65, 90);
    const key = keyCodes.filter(item => item.code === keyCode);
    const alphabet = key[0].alphabet;
    balloon.classList.add("balloon");
    balloon.setAttribute("data-code", keyCode);
    balloon.setAttribute("data-value", data.value);
    balloon.style.bottom = this.bottom + "px";
    balloon.style.left = this.left + "px";
    balloon.style.background = this.color;
    balloon.innerHTML = `<span class='alphabet'>${alphabet}</span>`;
    balloons_container.appendChild(balloon);
    return balloon;
  };
}

function balloonPop(balloon, value) {
  setTimeout(function() {
    balloon.style.transform = "scale(1.4)";
    SCORE += Number(value);
  }, 50);

  setTimeout(function() {
    if (balloon) {
      balloons_container.removeChild(balloon);
    }
    score.innerText = "Score: " + SCORE;
    if (SCORE > score_needed_to_win && !GAME_DATA.user_details.game_completed) {
      victory.play();
      EVTBalloon.emit("gameFinished");
    }
  }, 300);
}

function keyDown(event) {
  console.log(event.keyCode);
  if (GAME_DATA.user_details.current_level === 3) {
    const balloons = balloon_game.querySelectorAll(".balloon");
    //console.log(balloons);
    for (let i = 0; i < balloons.length; i++) {
      const balloon = balloons[i];
      //console.log(event.keyCode, balloon.getAttribute("data-value"));
      if (event.keyCode === Number(balloon.getAttribute("data-code"))) {
        const key = keyCodes.filter(item => item.code === event.keyCode);
        key[0].sound.play();
        const value = balloon.getAttribute("data-value");
        balloonPop(balloon, value);
      }
    }
  }
  //balloonPop(balloon, data, event);
}

function transitionend(event) {
  balloons_container.removeChild(event.target);
}

function animateBalloon(balloon, data, event) {
  setTimeout(function() {
    balloon.style.bottom = window.innerHeight + "px";
    balloon.style.transition = `bottom ${data.transition}s ease`;
    balloon.addEventListener("transitionend", transitionend);
  }, 50);
} //

function createBalloon(balloonInstace, data) {
  const balloon = balloonInstace.create();
  animateBalloon(balloon, data);
}

function displayBalloonsOnScreen() {
  for (let i = 0; i < 10; i++) {
    const left = randomIntFromInterval(200, window.innerWidth - 300);
    const data = values[i];
    const balloonInstance = new Balloon(data, left);
    createBalloon(balloonInstance, data);
  }
  if (GAME_DATA.user_details.game_completed) {
    interval = setTimeout(displayBalloonsOnScreen, 3000);
  } else {
    if (SCORE <= score_needed_to_win) {
      interval = setTimeout(displayBalloonsOnScreen, 3000);
    }
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function init() {
  blackjack_game = document.querySelector("#blackjack-game");
  trivia_game = document.querySelector("#trivia-game");
  balloon_game = document.querySelector("#balloon-game");
  balloons_container = balloon_game.querySelector(".balloons-container");
  score = balloon_game.querySelector(".score");
  back_btn = balloon_game.querySelector(".go-back-main-page");
  play_again_btn = balloon_game.querySelector(".play-balloon-btn");
  start_balloon_btn = balloon_game.querySelector("#start-balloon-btn");
  heading = balloon_game.querySelector(".heading");

  back_btn.addEventListener("click", backButtonClicked);

  document.body.addEventListener("keydown", keyDown);

  play_again_btn.addEventListener("click", restartGame);

  start_balloon_btn.addEventListener("click", startGame);
}
EVTBalloon.on("gameFinished", gameFinished);

EVTBalloon.on("init", init);

let SCORE = 0,
  interval,
  balloon_game,
  balloons_container,
  trivia_game,
  blackjack_game,
  main_page,
  score,
  back_btn,
  play_again_btn,
  start_balloon_btn,
  heading,
  score_needed_to_win = 500;

const values = [
  { color: "hsl(59,30%,52%)", value: 1, transition: 15 },
  { color: "hsl(245,40%,65%)", value: 2, transition: 14 },
  { color: "hsl(139,30%,50% )", value: 3, transition: 13 },
  { color: "hsl(23,44%,46% )", value: 4, transition: 12 },
  { color: "hsl(215,30%,50% )", value: 5, transition: 12 },
  { color: "hsl(100,40%,50% )", value: 8, transition: 11 },
  { color: "hsl(180,30%,50% )", value: 10, transition: 10 },
  { color: "hsl(40,30%,50% )", value: 15, transition: 9 },
  { color: "hsl(10,30%,50% )", value: 20, transition: 8 },
  {
    color: "linear-gradient(to right, #f83600 0%, #f9d423 100%)",
    value: 50,
    transition: 3.5
  }
];
const victory = new Howl({ src: [require("../../sounds/victory.mp3")] });
const keyCodes = [
  {
    code: 65,
    alphabet: "A",
    sound: new Howl({ src: [require("../../sounds/bubbles.mp3")] })
  },
  {
    code: 66,
    alphabet: "B",
    sound: new Howl({ src: [require("../../sounds/clay.mp3")] })
  },
  {
    code: 67,
    alphabet: "C",
    sound: new Howl({ src: [require("../../sounds/confetti.mp3")] })
  },
  {
    code: 68,
    alphabet: "D",
    sound: new Howl({ src: [require("../../sounds/corona.mp3")] })
  },
  {
    code: 69,
    alphabet: "E",
    sound: new Howl({ src: [require("../../sounds/dotted-spiral.mp3")] })
  },
  {
    code: 70,
    alphabet: "F",
    sound: new Howl({ src: [require("../../sounds/flash-1.mp3")] })
  },
  {
    code: 71,
    alphabet: "G",
    sound: new Howl({ src: [require("../../sounds/flash-2.mp3")] })
  },
  {
    code: 72,
    alphabet: "H",
    sound: new Howl({ src: [require("../../sounds/flash-3.mp3")] })
  },
  {
    code: 73,
    alphabet: "I",
    sound: new Howl({ src: [require("../../sounds/glimmer.mp3")] })
  },
  {
    code: 74,
    alphabet: "J",
    sound: new Howl({ src: [require("../../sounds/moon.mp3")] })
  },
  {
    code: 75,
    alphabet: "K",
    sound: new Howl({ src: [require("../../sounds/pinwheel.mp3")] })
  },
  {
    code: 76,
    alphabet: "L",
    sound: new Howl({ src: [require("../../sounds/piston-1.mp3")] })
  },
  {
    code: 77,
    alphabet: "M",
    sound: new Howl({ src: [require("../../sounds/piston-2.mp3")] })
  },
  {
    code: 78,
    alphabet: "N",
    sound: new Howl({ src: [require("../../sounds/piston-3.mp3")] })
  },
  {
    code: 79,
    alphabet: "O",
    sound: new Howl({ src: [require("../../sounds/prism-1.mp3")] })
  },
  {
    code: 80,
    alphabet: "P",
    sound: new Howl({ src: [require("../../sounds/prism-2.mp3")] })
  },
  {
    code: 81,
    alphabet: "Q",
    sound: new Howl({ src: [require("../../sounds/prism-3.mp3")] })
  },
  {
    code: 82,
    alphabet: "R",
    sound: new Howl({ src: [require("../../sounds/splits.mp3")] })
  },
  {
    code: 83,
    alphabet: "S",
    sound: new Howl({ src: [require("../../sounds/squiggle.mp3")] })
  },
  {
    code: 84,
    alphabet: "T",
    sound: new Howl({ src: [require("../../sounds/strike.mp3")] })
  },
  {
    code: 85,
    alphabet: "U",
    sound: new Howl({ src: [require("../../sounds/suspension.mp3")] })
  },
  {
    code: 86,
    alphabet: "V",
    sound: new Howl({ src: [require("../../sounds/timer.mp3")] })
  },
  {
    code: 87,
    alphabet: "W",
    sound: new Howl({ src: [require("../../sounds/ufo.mp3")] })
  },
  {
    code: 88,
    alphabet: "X",
    sound: new Howl({ src: [require("../../sounds/veil.mp3")] })
  },
  {
    code: 89,
    alphabet: "Y",
    sound: new Howl({ src: [require("../../sounds/wipe.mp3")] })
  },
  {
    code: 90,
    alphabet: "Z",
    sound: new Howl({ src: [require("../../sounds/zig-zag.mp3")] })
  }
];
