var fs = require("fs");

function index(request, response) {
  request.url = "/index.html";
  static(request, response);
}

function static(request, response) {
  var fileName = request.url;
  var fileType = request.url.split(".")[1];
  fs.readFile(__dirname + "/../public" + fileName, function(error, file) {
    if (error) {
      response.writeHead(404, "Content-Type:text/html");
      response.end("<h1>Sorry, page not found</h1>");
    } else {
      response.writeHead(200, {
        "Content-Type": "text/" + fileType
      });
      response.end(file);
    }
  });
}

module.exports = {
  index: index,
  static: static
};
