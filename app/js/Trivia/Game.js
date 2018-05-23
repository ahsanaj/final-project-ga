function nextLevelButtonClicked() {
  setTimeout(() => {
    trivia_questions.innerHTML = "";
  }, 1000);

  trivia_game.style.left = "-100%";
  balloon_game.style.left = "0";
  total_score = 0;
  current_question = 0;
  EVTBalloon.emit("startGame");
}
function checkScore() {
  if (total_score >= 6 && GAME_DATA.user_details.level3_locked === true) {
    trivia_score_heading.innerText = `Well done, you got ${total_score} out of 10 correct. Level 3 is now unlocked`;
    GAME_DATA.user_details.level3_locked = false;
    EVTGlobal.emit("saveGame");
    EVTMainPage.emit("level3Unlocked");
    EVTTrivia.emit("level3Unlocked");
    play_next_level_btn.style.display = "inline-block";
  } else {
    trivia_score_heading.innerText = `You got ${total_score} out of 10 correct.`;
    play_next_level_btn.style.display = "none";
  }
}
function answerSelected(event, current) {
  clearInterval(interval);
  const selectedAnswer = event.target.innerText;
  const next_question_btn = event.target.parentNode.parentNode.querySelector(
    "button[rel='js-next']"
  );
  next_question_btn.style.display = "inline-block";
  //debugger;
  const questionIndex = event.target.parentNode.parentNode.parentNode.getAttribute(
    "data-value"
  );

  if (event.target.innerHTML === questionsList[questionIndex].correct_answer) {
    total_score += 1;
  }
  event.target.style.backgroundColor = "#ff7979";
  event.target.style.color = "#b10000";
  event.target.style.borderColor = "#b10000";

  const allButtons = Array.from(current.querySelectorAll(".btn-trivia-game"));
  for (let i = 0; i < allButtons.length; i++) {
    if (
      allButtons[i].innerHTML === questionsList[questionIndex].correct_answer
    ) {
      allButtons[i].style.backgroundColor = "#88e58a";
      allButtons[i].style.color = "green";
      allButtons[i].style.borderColor = "green";
    }
    allButtons[i].style.pointerEvents = "none";
  }
}
function playAgainButtonClicked(current) {
  EVTTrivia.emit("playTriviaAgainClicked");
  trivia_main.style.left = "0";
  current.style.left = "100%";
  setTimeout(() => {
    trivia_questions.innerHTML = "";
  }, 1000);
  total_score = 0;
  current_question = 0;
}
function nextButtonClicked(current, next) {
  current.style.left = "-100%";
  next.style.left = "0";
  current_question = current_question + 1;
  if (current_question < questionsList.length) {
    startTimer();
  } else {
    checkScore();
  }
  const allButtons = Array.from(current.querySelectorAll(".btn-trivia-game"));
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].style.pointerEvents = "auto";
    allButtons[i].style.backgroundColor = "transparent";
    allButtons[i].style.color = "white";
    allButtons[i].style.borderColor = "white";
  }
}
function exitButtonClicked(current) {
  clearInterval(interval);
  current.style.left = "100%";
  trivia_main.style.left = "0";
  setTimeout(() => {
    trivia_questions.innerHTML = "";
  }, 1000);
  total_score = 0;
  current_question = 0;
  EVTTrivia.emit("exitButtonClicked");
}
function triviaGameContainerClicked(event) {
  const current_question_container = trivia_game.querySelector(
    `.trivia[data-value='${current_question}']`
  );
  const next_question_container = trivia_game.querySelector(
    `.trivia[data-value='${current_question + 1}']`
  );

  // Exit button clicked
  if (event.target.getAttribute("class") === "btn exit-btn") {
    exitButtonClicked(current_question_container);
  }
  // Next button clicked
  if (event.target.getAttribute("rel") === "js-next") {
    nextButtonClicked(current_question_container, next_question_container);
  }

  // Play again clicked
  if (event.target.getAttribute("rel") === "js-play-trivia-again") {
    playAgainButtonClicked(current_question_container);
  }

  // Answer clicked
  if (event.target.getAttribute("class") === "btn btn-trivia-game") {
    answerSelected(event, current_question_container);
  }
}
function startTimer() {
  const current_question_container = trivia_game.querySelector(
    `.trivia[data-value='${current_question}']`
  );

  const time_up = current_question_container.querySelector(".time-up");

  const next_button = current_question_container.querySelector(
    "button[rel='js-next']"
  );

  const allButtons = Array.from(
    current_question_container.querySelectorAll(".btn-trivia-game")
  );

  const timer_outer = current_question_container.querySelector(
    "section.trivia .timer-outer"
  );
  const timer_outer_width = parseInt(getComputedStyle(timer_outer).width);

  const timer_inner = current_question_container.querySelector(
    "section.trivia .timer-outer .timer-inner"
  );

  const width_intervals = timer_outer_width / (questionTimer * 100);

  let customWidth = 0;

  interval = setInterval(function() {
    customWidth = customWidth + width_intervals;
    if (customWidth >= timer_outer_width) {
      clearInterval(interval);
      time_up.style.display = "block";
      next_button.style.display = "inline-block";
      next_button.innerHTML = `Go to next question`;
      for (let i = 0; i < allButtons.length; i++) {
        if (
          allButtons[i].innerText ===
          questionsList[current_question].correct_answer
        ) {
          allButtons[i].style.backgroundColor = "#88e58a";
          allButtons[i].style.color = "green";
          allButtons[i].style.borderColor = "green";
        }
        allButtons[i].style.pointerEvents = "none";
      }
    }
    timer_inner.style.width = customWidth + "px";
  }, 10);
}
function displayFirstQuestion() {
  console.log("displayFirst");
  trivia_main.style.left = "-100%";
  current_question = 0;
  setTimeout(function() {
    document.querySelector(
      `.trivia[data-value='${current_question}']`
    ).style.left =
      "0";
  }, 50);
  startTimer();
}
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function displayQuestions(questions) {
  questionsList = questions;
  for (let i = 0; i < questions.length; i++) {
    let htmlMarkup = "";
    const question = questions[i];
    const incorrectAnswers = question.incorrect_answers;
    incorrectAnswers.push(question.correct_answer);
    all_answers = incorrectAnswers;
    all_answers = shuffle(all_answers);
    let htmlMarkupAnswers = all_answers.reduce((html, answer) => {
      return html + `<button class='btn btn-trivia-game'>${answer}</button>`;
    }, "");

    const clock_icon = require("../../img/clock-icon.svg");
    htmlMarkup += `<section data-value=${i} class="trivia">
                    <div class="container">
                    <span class="btn exit-btn">Exit</span>
                        <div class="question">
                          <div class="timer-outer">
                            <div class="timer-inner">
                            </div>
                          </div>
                            <h1>${question.question}</h1>
                        </div>
                        <div class="answers">
                            ${htmlMarkupAnswers}
                        </div>
                        <div class='time-up'>
                          <span>Time's Up!</span>
                          <img src="${clock_icon}" />
                        </div>
                        <button class="btn btn-default hidden-btn" rel="js-next">Next question</button>
                    </div>
                </section>`;
    trivia_questions.innerHTML += htmlMarkup;

    let lastScreenMarkup = `<section data-value=${
      questions.length
    } class="trivia">
                    <div class="container">
                    <span class="btn exit-btn">Exit</span>
                        <div class="question">
                        <h1>Round completed</h1>
                            <h2 class="trivia-score"></h2>
                        </div>
                        <button class="btn btn-default" rel="js-play-trivia-again">Play Again</button>
                        <button class="btn btn-default hidden-btn" rel="js-play-next-level">Go to Level 3</button>
                    </div>
                </section>`;

    trivia_questions.innerHTML += lastScreenMarkup;
    play_next_level_btn = trivia_game.querySelector(
      "button[rel='js-play-next-level']"
    );
    play_next_level_btn.addEventListener("click", nextLevelButtonClicked);
    trivia_score_heading = trivia_game.querySelector(".trivia-score");
    // After all the questions are displayed
    if (i === questions.length - 1) {
      displayFirstQuestion();
    }
  }
}

function init() {
  trivia_game = document.querySelector("#trivia-game");
  trivia_main = trivia_game.querySelector("#trivia-main");
  trivia_questions = trivia_game.querySelector("#trivia-questions");
  balloon_game = document.querySelector("#balloon-game");
}

EVTTrivia.on("triviaGameContainerClicked", triviaGameContainerClicked);

EVTTrivia.on("questionsFetched", displayQuestions);

EVTTrivia.on("init", init);

let trivia_game,
  trivia_main,
  trivia_questions,
  all_answers,
  interval,
  questionsList,
  questionTimer = 15, // 30 seconds
  current_question = 0,
  total_score = 0,
  trivia_score_heading,
  play_next_level_btn,
  balloon_game;
