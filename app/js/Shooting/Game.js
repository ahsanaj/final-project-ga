function gameFinished() {
  if (!GAME_DATA.user_details.game_completed) {
    clearTimeout(interval);
    balloons_container.innerHTML =
      "<span class='true-champion'>You are a true Champion</span>";
    GAME_DATA.user_details.game_completed = true;
  } else {
  }
}
function backButtonClicked() {
  clearTimeout(interval);
  balloons_container.innerHTML = "";
  balloon_game.style.left = "100%";
  trivia_game.style.left = "100%";
  blackjack_game.style.left = "100%";
  main_page.style.left = "0";
}
function Balloon(color, left) {
  const self = this;
  this.color = color;
  this.left = left;
  this.bottom = -395;
  this.create = function() {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.bottom = this.bottom + "px";
    balloon.style.left = this.left + "px";
    balloon.style.background = this.color;
    balloons_container.appendChild(balloon);
    return balloon;
  };
}

function balloonPop(balloon, data) {
  SCORE += data.value;
  balloons_container.removeChild(balloon);
  score.innerText = "Score: " + SCORE;
  if (SCORE === 200) {
    clearInterval(interval);
  }
}

function animateBalloon(balloon, data) {
  setTimeout(function() {
    balloon.style.bottom = window.innerHeight + 250 + "px";
    balloon.style.transition = `bottom ${data.transition}s ease`;
  }, 50);
} //
function createClickListener(balloon, data) {
  balloon.addEventListener("click", function(event) {
    balloonPop(balloon, data);
  });
}

function createBalloon(balloonInstace, data) {
  //const time = randomIntFromInterval()
  const balloon = balloonInstace.create();
  animateBalloon(balloon, data);
  createClickListener(balloon, data);
}

function displayBalloonsOnScreen() {
  //console.log('functioncalled');
  for (let i = 0; i < 10; i++) {
    //SCORE++;
    //console.log(SCORE);
    const left = randomIntFromInterval(200, window.innerWidth - 300);
    const data = values[i];
    const balloonInstance = new Balloon(data.color, left);
    createBalloon(balloonInstance, data);
  }
  if (SCORE <= 500) {
    interval = setTimeout(displayBalloonsOnScreen, 3000);
  } else {
    EVTBalloon.emit("gameFinished");
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function init() {
  main_page = document.querySelector("#main-page");
  blackjack_game = document.querySelector("#blackjack-game");
  trivia_game = document.querySelector("#trivia-game");
  balloon_game = document.querySelector("#balloon-game");
  balloons_container = balloon_game.querySelector(".balloons-container");
  score = balloon_game.querySelector(".score");
  back_btn = balloon_game.querySelector(".go-back-main-page");

  back_btn.addEventListener("click", backButtonClicked);
}
EVTBalloon.on("gameFinished", gameFinished);

EVTBalloon.on("startGame", displayBalloonsOnScreen);

EVTBalloon.on("init", init);

let SCORE = 0,
  interval,
  balloon_game,
  balloons_container,
  trivia_game,
  blackjack_game,
  main_page,
  score,
  back_btn;

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
