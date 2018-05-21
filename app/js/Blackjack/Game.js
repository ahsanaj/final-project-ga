function restartGame() {
  //shuffleDeck();
  computer_score = 0;
  computer_container.querySelector(".score").innerText = "";
  const computer_cards = Array.from(
    computer_container.querySelectorAll(".main-container .card")
  );
  for (let i = 0; i < computer_cards.length; i++) {
    computer_container
      .querySelector(".main-container")
      .removeChild(computer_cards[i]);
  }
  player_score = 0;
  player_container.querySelector(".score").innerText = "";
  const player_cards = Array.from(
    player_container.querySelectorAll(".main-container .card")
  );
  for (let i = 0; i < player_cards.length; i++) {
    player_container
      .querySelector(".main-container")
      .removeChild(player_cards[i]);
  }
  //startGame();
}

function showComputerCards() {
  //console.log("showcomputercards");
  const hiddenCardImg = computer_container.querySelector(".hidden");
  //debugger;
  hiddenCardImg.style.opacity = 0;
  setTimeout(function() {
    const src = require(`../../img/cards/${hiddenImgCode}.png`);
    hiddenCardImg.src = src;
    hiddenCardImg.style.opacity = 1;
    hiddenCardImg.addEventListener("transitionend", function() {});
    const score_span = computer_container.querySelector(".score");
    score_span.innerText = computer_score;
    checkFinalScore();
  }, 300);
}

function checkFinalScore() {
  const score_span = computer_container.querySelector(".score");
  score_span.innerText = computer_score;
  if (computer_score < 17) {
    EVTBlackjack.emit("computerDrawCardAgain");
  } else if (computer_score > 21) {
    noOfWins += 1;
    setTimeout(function() {
      EVTBlackjack.emit("gameFinished", "You have won the game.");
    }, 1000);
  } else if (computer_score < player_score) {
    noOfWins += 1;
    setTimeout(function() {
      EVTBlackjack.emit("gameFinished", "You have won the game.");
    }, 1000);
  } else if (computer_score > player_score) {
    setTimeout(function() {
      EVTBlackjack.emit("gameFinished", "You have lost the game.");
    }, 1000);
  } else if (computer_score === player_score) {
    setTimeout(function() {
      EVTBlackjack.emit("gameFinished", "The game has ended in a draw");
    }, 1000);
  }
  span_wins.innerText = noOfWins;
  gameData = { noOfWins, currentLevel };
  EVTBlackjack.emit("saveGame", gameData);
}

function checkPlayerScore() {
  if (player_score > 21) {
    EVTBlackjack.emit("gameFinished", "Busted!");
  }
}

function calculateScore(value, container) {
  console.log("playerace", player_draw_ace);
  console.log("computerace", computer_draw_ace);
  if (value === "JACK" || value === "KING" || value === "QUEEN") {
    value = 10;
  } else if (value === "ACE") {
    value = 11;
    if (container.id === "player") {
      player_draw_ace = true;
    } else if (container.id === "computer") {
      computer_draw_ace = true;
    }
  }
  const score_span = container.querySelector(".score");
  if (container.id === "player") {
    player_score = Number(player_score) + Number(value);
    if (player_score > 21 && player_draw_ace === true) {
      player_score = player_score - 10;
    }
    player_draw_ace = false;
    score_span.innerText = player_score;
  } else if (container.id === "computer") {
    computer_score = Number(computer_score) + Number(value);
    if (computer_score > 21 && computer_draw_ace === true) {
      computer_score = computer_score - 10;
    }
    computer_draw_ace = false;
  }
}

function transitionEndDrawCard(card, container) {
  let value = card.getAttribute("data-value");
  calculateScore(value, container);
  document.querySelector("#stand-btn").style.opacity = "1";
  document.querySelector("#stand-btn").style.pointerEvents = "auto";
  document.querySelector("#hit-btn").style.opacity = "1";
  document.querySelector("#hit-btn").style.pointerEvents = "auto";
  if (container.id === "computer") {
    checkFinalScore();
    //console.log("function called");
  } else if (container.id === "player") {
    checkPlayerScore();
  }
}

function animateDrawCard(card, left, container) {
  let value = card.getAttribute("data-value");
  console.log(value);
  calculateScore(value, container);
  card.style.left = `${left}px`;
  card.style.transform = "rotate(0deg)";
  document.querySelector("#stand-btn").style.opacity = "1";
  document.querySelector("#stand-btn").style.pointerEvents = "auto";
  document.querySelector("#hit-btn").style.opacity = "1";
  document.querySelector("#hit-btn").style.pointerEvents = "auto";
  if (container.id === "computer") {
    checkFinalScore();
    //console.log("function called");
  } else if (container.id === "player") {
    checkPlayerScore();
  }
  // setTimeout(function() {
  //   card.style.left = `${left}px`;
  //   card.style.transform = "rotate(0deg)";

  //   card.removeEventListener("transitionend", function(event) {
  //     if (event.propertyName === "left") {
  //       transitionEndDrawCard(card, container);
  //     }
  //   });
  //   card.addEventListener("transitionend", function(event) {
  //     if (event.propertyName === "left") {
  //       transitionEndDrawCard(card, container);
  //     }
  //   });
  // }, 2000);
}

function setAnimationDrawCard(card, container, lastCardLeft) {
  let left = lastCardLeft + 110;
  setTimeout(function() {
    animateDrawCard(card, left, container);
  }, 200);
}

function transitionEndInitialCards(cards, index, left, container) {
  if (cards[index + 1]) {
    cards[index + 1].style.left = `${left}px`;
    cards[index + 1].style.transform = "rotate(0deg)";
  }
  let value = cards[index].getAttribute("data-value");
  calculateScore(value, container);
  if (index === cards.length - 1) {
    if (container.id === "player") {
      EVTBlackjack.emit("playerInitialCardsLoaded");
    }
    if (container.id === "computer") {
      EVTBlackjack.emit("computerInitialCardsLoaded");
    }
  }
}

function animateInitialCards(cards, index, left, container) {
  cards[index].style.left = `${left}px`;
  cards[index].style.transform = "rotate(0deg)";
  //left = left + 110;
  let value = cards[index].getAttribute("data-value");
  calculateScore(value, container);
  if (index === cards.length - 1) {
    if (container.id === "player") {
      EVTBlackjack.emit("playerInitialCardsLoaded");
    }
    if (container.id === "computer") {
      EVTBlackjack.emit("computerInitialCardsLoaded");
    }
  }
  /*setTimeout(function() {
    if (index === 0) {
      cards[index].style.left = `${left}px`;
      cards[index].style.transform = "rotate(0deg)";
      left = left + 110;
      //console.log(cards);
      for (let j = 0; j < cards.length; j++) {
        cards[j].addEventListener("transitionend", function(event) {
          if (event.propertyName === "left") {
            transitionEndInitialCards(cards, j, left, container);
          }
        });
      }
    }
  }, 2000);*/
}

function setAnimationInitialCards(cards, container) {
  let left = 200;
  let i = 0;

  setTimeout(function() {
    console.log(i);
    animateInitialCards(cards, i, left, container);
    left = left + 110;
    i++;
  }, 200);

  let interval = setInterval(function() {
    console.log(i);
    if (i < cards.length) {
      animateInitialCards(cards, i, left, container);
      left = left + 110;
      i++;
    } else {
      clearInterval(interval);
    }
  }, 400);
}

function displayCards(cardData, container) {
  return new Promise(function(resolve, reject) {
    let cards = "";
    for (let i = 0; i < cardData.cards.length; i++) {
      let card = cardData.cards[i];

      const div = document.createElement("div");
      div.style.left = "0px";
      div.classList.add("card");
      cards = Array.from(container.querySelectorAll(".card"));
      div.setAttribute("rel", `card-${cards.length}`);
      div.setAttribute("data-value", `${cardData.cards[i].value}`);
      div.style.transform = "rotate(10deg)";

      container.querySelector(".main-container").appendChild(div);

      const img = document.createElement("img");

      if (container.id === "computer" && i === 1) {
        hiddenImgCode = card.code;
        const src = require(`../../img/deck.png`);
        img.src = src;
        img.classList.add("hidden");
      } else {
        const src = require(`../../img/cards/${card.code}.png`);
        img.src = src;
      }

      div.appendChild(img);
    }
    cards = Array.from(container.querySelectorAll(".card"));
    resolve(cards);
  });
}

function drawCards(cards, container) {
  displayCards(cards, container).then(function(cards) {
    setAnimationInitialCards(cards, container);
  });
}

EVTBlackjack.on("restartButtonClicked", restartGame);

EVTBlackjack.on("standButtonClicked", showComputerCards);

EVTBlackjack.on("computerDrawCardFetched", function(cards) {
  displayCards(cards, computer_container).then(function(cards) {
    let lastCard = cards[cards.length - 1];
    let secondlastCard = cards[cards.length - 2];
    let secondlastCardLeft = parseInt(secondlastCard.style.left);
    setAnimationDrawCard(lastCard, computer_container, secondlastCardLeft);
  });
});

EVTBlackjack.on("playerInitialCardsLoaded", function() {
  if (player_score === 21) {
    noOfWins += 1;
    span_wins.innerText = noOfWins;
    EVTBlackjack.emit("gameFinished", "Blackjack! nice game");
    gameData = { noOfWins, currentLevel };
    EVTBlackjack.emit("saveGame", gameData);
  }
});

EVTBlackjack.on("playerHitCardFetched", function(cards) {
  displayCards(cards, player_container).then(function(cards) {
    let lastCard = cards[cards.length - 1];
    let secondlastCard = cards[cards.length - 2];
    let secondlastCardLeft = parseInt(secondlastCard.style.left);
    setAnimationDrawCard(lastCard, player_container, secondlastCardLeft);
  });
});

EVTBlackjack.on("playerInitialCardsFetched", function(cards) {
  drawCards(cards, player_container);
});

EVTBlackjack.on("computerInitialCardsFetched", function(cards) {
  drawCards(cards, computer_container);
});

EVTBlackjack.on("gameDataFetched", function(gameData) {
  if (gameData) {
    span_wins.innerText = gameData.noOfWins;
    noOfWins = gameData.noOfWins;
  }
});

let player_draw_ace = false;
let computer_draw_ace = false;
let player_score = 0;
let computer_score = 0;
let hiddenImgCode = "";
let noOfWins = 0;
let totalWinsNeeded = 3;
let currentLevel = 1;
let player_container = document.querySelector("#player");
let computer_container = document.querySelector("#computer");
let span_wins = document.querySelector(".wins");
let gameData = {};
