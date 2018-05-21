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

function init() {
  main_page = document.querySelector("#main-page");
  main_page_modal = main_page.querySelector(".modal");
}

EVTMainPage.on("hideModal", hideModal);

EVTMainPage.on("showModal", showModal);

EVTMainPage.on("init", init);

let main_page, main_page_modal;
