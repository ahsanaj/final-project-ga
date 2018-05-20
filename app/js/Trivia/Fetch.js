function fetchQuestions(params) {
  const baseURL = `https://opentdb.com/api.php?amount=10&category=${
    params.category
  }&difficulty=${params.difficulty}`;
  return fetch(baseURL, httpOptions).then(_turnDataIntoJSON);
}
function _turnDataIntoJSON(response) {
  return response.json();
}

EVTTrivia.on("startButtonClicked", function(params) {
  fetchQuestions(params).then(function(data) {
    if (data.results.length > 0) {
      console.log(data.results);
      EVTTrivia.emit("questionsFetched", data.results);
    } else {
      EVTTrivia.emit("fetchFailed");
    }
  });
});

const httpOptions = { method: "GET" };
