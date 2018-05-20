function drawPlayerCards() {
  event.target.style.pointerEvents = "none";
  event.target.style.opacity = "0.5";
  const baseURL = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`;
  fetch(baseURL, httpOptions)
    .then(response => response.json())
    .then(function(data) {
      getScore(data);
      let left = 0;
      for (let i = 0; i < data.cards.length; i++) {
        const div = document.createElement("div");
        div.classList.add("card");
        div.classList.add(`card-${i}`);
        div.style.transform = "rotate(5deg)";
        player_container.appendChild(div);
        let card = data.cards[i];
        const img = document.createElement("img");
        left = left + 200;
        img.onload = animateCards(i);
        img.src = card.images.png;

        div.appendChild(img);
      }
    });
  //shuffleDeck();
}

function drawCard123() {
  const baseURL = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
  fetch(baseURL, httpOptions)
    .then(response => response.json())
    .then(function(data) {
      getScore(data);
      for (let i = 0; i < data.cards.length; i++) {
        const div = document.createElement("div");
        div.classList.add("card");
        div.classList.add(`card-${i}`);
        div.style.transform = "rotate(5deg)";
        player_container.appendChild(div);
        let card = data.cards[i];
        const img = document.createElement("img");
        //left = left + 200;
        img.onload = animateCards(i);
        img.src = card.images.png;

        div.appendChild(img);
      }
    });
}

function getScore(data) {
  //let score = 0;
  for (let i = 0; i < data.cards.length; i++) {
    let card = data.cards[i];
    let value = card.value;
    console.log(value);
    if (value === "JACK" || value === "KING" || value === "QUEEN") {
      value = 10;
    } else if (value === "ACE") {
      value = 11;
    }
    value = Number(value);
    player_score += value;
  }
  if (player_score > 21) {
    document.querySelector("#draw-btn").style.pointerEvents = "none";
    document.querySelector("#draw-btn").style.opacity = "0.5";

    document.querySelector(".result").innerText = "You have lost the game";
    document.querySelector(".modal").style.display = "block";
    setTimeout(function() {
      document.querySelector(".modal").style.opacity = "1";
    }, 50);
  } else if (player_score === 21) {
    document.querySelector(".result").innerText = "You have won the game";
    document.querySelector(".modal").style.display = "block";
    setTimeout(function() {
      document.querySelector(".modal").style.opacity = "1";
    }, 50);
  }
  player_score_span.innerText = player_score;
  //document.body.innerHTML += `<h1>Your score: ${score}</h1>`;
}

function drawComputerCards() {
  event.target.style.pointerEvents = "none";
  event.target.style.opacity = "0.5";
  document.querySelector("#draw-btn").style.pointerEvents = "none";
  document.querySelector("#draw-btn").style.opacity = "0.5";
  const baseURL = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`;
  fetch(baseURL, httpOptions)
    .then(response => response.json())
    .then(function(data) {
      getComputerScore(data);
      let left = 0;
      for (let i = 0; i < data.cards.length; i++) {
        const div = document.createElement("div");
        div.classList.add("card");
        div.classList.add(`card-${i}`);
        div.style.transform = "rotate(5deg)";
        computer_container.appendChild(div);
        let card = data.cards[i];
        const img = document.createElement("img");
        left = left + 200;
        img.onload = animateComputerCards(i);
        img.src = card.images.png;
        div.appendChild(img);
      }
    });
  //shuffleDeck();
}

function drawComputerCard() {
  const baseURL = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
  fetch(baseURL, httpOptions)
    .then(response => response.json())
    .then(function(data) {
      getComputerScore(data);
      for (let i = 0; i < data.cards.length; i++) {
        const div = document.createElement("div");
        div.classList.add("card");
        div.classList.add(`card-${i}`);
        div.style.transform = "rotate(5deg)";
        computer_container.appendChild(div);
        let card = data.cards[i];
        const img = document.createElement("img");
        //left = left + 200;
        img.onload = animateComputerCards(i);
        img.src = card.images.png;

        div.appendChild(img);
      }
    });
}

function animateComputerCards(counter) {
  const computer_cards = document.querySelectorAll("#computer .card");
  let left = 200;
  let time = 500;
  for (let i = 0; i < computer_cards.length; i++) {
    animateComputerCard(computer_cards[i], left, time);
    left = left + 110;
    time = time + 1000;
  }
}

function animateComputerCard(el, left, time) {
  setTimeout(function() {
    el.style.left = `${left}px`;
    el.style.transform = "rotate(0deg)";
  }, time);
}

function getComputerScore(data) {
  //let score = 0;
  for (let i = 0; i < data.cards.length; i++) {
    let card = data.cards[i];
    let value = card.value;
    console.log(value);
    if (value === "JACK" || value === "KING" || value === "QUEEN") {
      value = 10;
    } else if (value === "ACE") {
      value = 11;
    }
    value = Number(value);
    computer_score += value;
  }
  if (Number(computer_score) < 16) {
    //debugger;
    drawComputerCard();
  }
  if (player_score > computer_score) {
    document.querySelector(".result").innerText = "You have won the game";
    document.querySelector(".modal").style.display = "block";
    setTimeout(function() {
      document.querySelector(".modal").style.opacity = "1";
    }, 3500);
  } else if (player_score < computer_score && computer_score <= 21) {
    document.querySelector(".result").innerText = "You have lost the game";
    document.querySelector(".modal").style.display = "block";
    setTimeout(function() {
      document.querySelector(".modal").style.opacity = "1";
    }, 3500);
  } else if (computer_score > 21) {
    document.querySelector(".result").innerText = "You have won the game";
    document.querySelector(".modal").style.display = "block";
    setTimeout(function() {
      document.querySelector(".modal").style.opacity = "1";
    }, 3500);
  } else if (computer_score === player_score) {
    document.querySelector(".result").innerText = "The game ended in a draw";
    document.querySelector(".modal").style.display = "block";
    setTimeout(function() {
      document.querySelector(".modal").style.opacity = "1";
    }, 3500);
  }
  console.log("Computer score:", computer_score);
  computer_score_span.innerText = computer_score;
  //document.body.innerHTML += `<h1>Your score: ${score}</h1>`;
}
