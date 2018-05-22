function showInstrunctionsModal() {
  main_page_modal_instructions.style.display = "block";
  setTimeout(function() {
    main_page_modal_instructions.style.opacity = "1";
  }, 50);
}
function hideInstrunctionsModal() {
  main_page_modal_instructions.style.opacity = "0";
  setTimeout(function() {
    main_page_modal_instructions.style.display = "none";
  }, 500);
}
function hideModal() {
  main_page_modal_play.style.opacity = "0";
  setTimeout(function() {
    main_page_modal_play.style.display = "none";
  }, 500);
}
function showModal() {
  main_page_modal_play.style.display = "block";
  setTimeout(function() {
    main_page_modal_play.style.opacity = "1";
  }, 50);
}

function init() {
  main_page = document.querySelector("#main-page");
  main_page_modal_play = main_page.querySelector(".modal-play");

  main_page_modal_instructions = main_page.querySelector(".modal-instructions");
  instructions = main_page_modal_instructions.querySelector(".instructions");
  form = main_page_modal_instructions.querySelector(".form");
}

EVTMainPage.on("hideInstructionsModal", hideInstrunctionsModal);

EVTMainPage.on("showInstructionsModal", showInstrunctionsModal);

EVTMainPage.on("hideModal", hideModal);

EVTMainPage.on("showModal", showModal);

EVTMainPage.on("init", init);

let main_page,
  main_page_modal_play,
  main_page_modal_instructions,
  instructions,
  form;
