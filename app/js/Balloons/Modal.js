function hideModal() {
    balloon_game_modal_play.style.opacity = "0";
    setTimeout(function() {
        balloon_game_modal_play.style.display = "none";
    }, 500);
}

function showModal() {
    balloon_game_modal_play.style.display = "block";
    setTimeout(function() {
        balloon_game_modal_play.style.opacity = "1";
    }, 50);
}

function init() {
    balloon_game = document.querySelector("#balloon-game");
    balloon_game_modal_play = balloon_game.querySelector(".modal-play");
    balloon_game_close_modal = balloon_game.querySelector(".modal-close");

    balloon_game_close_modal.addEventListener("click", hideModal);
}
let balloon_game, balloon_game_modal_play, balloon_game_close_modal;

EVTBalloon.on("restartGame", hideModal);
EVTBalloon.on("gameFinished", function() {
    if (!GAME_DATA.user_details.game_completed) {
        showModal();
    }
});
EVTBalloon.on("init", init);