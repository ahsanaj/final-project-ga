import "../css/styles.css";

const EventEmitter2 = require("eventemitter2");
window.EVTGlobal = new EventEmitter2();
window.EVTMainPage = new EventEmitter2();
window.EVTBlackjack = new EventEmitter2();
window.EVTTrivia = new EventEmitter2();
window.EVTBalloon = new EventEmitter2();

require("../js/Global/index.js");
require("../js/MainPage/index.js");
require("../js/Blackjack/index.js");
require("../js/Trivia/index.js");
require("../js/Shooting/index.js");

window.addEventListener("DOMContentLoaded", function() {
  EVTGlobal.emit("init");
  EVTMainPage.emit("init");
  EVTBlackjack.emit("init");
  EVTTrivia.emit("init");
  EVTBalloon.emit("init");
});
