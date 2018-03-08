var http = require("http");
var assetsHandler = require("./assetsHandler.js");
var tasksHandler = require("./tasksHandler.js");
var usersHandler = require("./usersHandler.js");

function router(request, response) {
  var endpoint = request.url;

  if (endpoint === "/") {
    assetsHandler.index(request, response);
  } else if (endpoint === "/tasks") {
    tasksHandler.index(request, response);
  } else if (endpoint === "/users") {
    usersHandler.index(request, response);
  } else if (endpoint === "/task/create") {
    tasksHandler.create(request, response);
  } else if (endpoint === "/task/delete") {
    tasksHandler.delete(request, response);

  } else {
    assetsHandler.static(request, response);
  }
};

module.exports = router;
