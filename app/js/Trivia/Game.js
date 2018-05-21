function triviaGameContainerClicked(event) {
  const current_question_container = trivia_game.querySelector(
    `.trivia[data-value='${current_question}']`
  );
  const next_question_container = trivia_game.querySelector(
    `.trivia[data-value='${current_question + 1}']`
  );

  // Exit button clicked
  if (event.target.getAttribute("class") === "btn exit-btn") {
    current_question_container.style.left = "100%";
    trivia_main.style.left = "0";
    setTimeout(() => {
      trivia_questions.innerHTML = "";
    }, 1000);
    total_score = 0;
    current_question = 0;
  }
  // Next button clicked
  if (event.target.getAttribute("rel") === "js-next") {
    current_question_container.style.left = "-100%";
    next_question_container.style.left = "0";
    current_question = current_question + 1;

    startTimer();

    const allButtons = Array.from(
      current_question_container.querySelectorAll(".btn-trivia-game")
    );
    for (let i = 0; i < allButtons.length; i++) {
      allButtons[i].style.pointerEvents = "auto";
      allButtons[i].style.backgroundColor = "transparent";
      allButtons[i].style.color = "white";
      allButtons[i].style.borderColor = "white";
    }
  }

  // Play again clicked
  if (event.target.getAttribute("rel") === "js-play-trivia-again") {
    EVTTrivia.emit("playTriviaAgainClicked");
    trivia_main.style.left = "0";
    current_question_container.style.left = "100%";
    setTimeout(() => {
      trivia_questions.innerHTML = "";
    }, 1000);
    total_score = 0;
    current_question = 0;
  }

  // Answer clicked
  if (event.target.getAttribute("class") === "btn btn-trivia-game") {
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

    if (
      event.target.innerText === questionsList[questionIndex].correct_answer
    ) {
      total_score += 1;
      const trivia_score = document.querySelector(".trivia-score");
      trivia_score.innerHTML = `You got ${total_score} out of ${
        questionsList.length
      } correct`;
    }

    event.target.style.backgroundColor = "#ff7979";
    event.target.style.color = "#b10000";
    event.target.style.borderColor = "#b10000";

    const allButtons = Array.from(
      current_question_container.querySelectorAll(".btn-trivia-game")
    );
    for (let i = 0; i < allButtons.length; i++) {
      if (
        allButtons[i].innerText === questionsList[questionIndex].correct_answer
      ) {
        allButtons[i].style.backgroundColor = "#88e58a";
        allButtons[i].style.color = "green";
        allButtons[i].style.borderColor = "green";
      }
      allButtons[i].style.pointerEvents = "none";
    }
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
                        <div class="question">
                        <h1>Well done, round has completed</h1>
                            <h3 class="trivia-score"> Your got 0 out of ${
                              questions.length
                            } correct.</h3>
                        </div>
                        <button class="btn btn-default" rel="js-play-trivia-again">Play Again</button>
                    </div>
                </section>`;

    trivia_questions.innerHTML += lastScreenMarkup;

    // After all the questions are displayed
    if (i === questions.length - 1) {
      displayFirstQuestion();
    }
  }
}

// form.addEventListener("submit", function(event) {
//   event.preventDefault();
//   form.querySelector("button[type='submit'").style.opacity = "0.7";
//   form.querySelector("button[type='submit'").innerText = "Starting...";
//   const category = document.querySelector("#trivia-category");
//   const difficulty = document.querySelector("#trivia-difficulty");
//   const params = { category: category.value, difficulty: difficulty.value };

//   fetchQuestions(params).then(function(data) {
//     console.log(data);
//     if (data.results.length > 0) {
//       questionsList = data.results;
//       displayQuestions(questionsList);
//       trivia_main.style.left = "-100%";
//       current_question = 0;
//       setTimeout(function() {
//         document.querySelector(
//           `.trivia[data-value='${current_question}']`
//         ).style.left =
//           "0";
//       }, 50);

//       startTimer();
//     } else {
//       const error = document.querySelector("em.error");
//       error.style.display = "block";
//       error.innerText =
//         "This category is currently unavailable, please choose a different category";
//       form.querySelector("button[type='submit'").style.opacity = "1";
//       form.querySelector("button[type='submit'").innerText = "Start";
//     }
//   });
// });

function init() {
  trivia_game = document.querySelector("#trivia-game");
  trivia_main = trivia_game.querySelector("#trivia-main");
  trivia_questions = trivia_game.querySelector("#trivia-questions");
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
  total_score = 0;
