var db = require("./database/db_connection.js");
var querystring = require("querystring");

function index(request, response) {
  db.query("SELECT * FROM users", function(err, result) {
    if(err) {
      response.writeHead(500);
      return response.end(err.toString());
    }
    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.end(JSON.stringify(result.rows));
  });
}

// function create(request, response) {
//   var formData = "";
//   request.on("data", function(chunk) {
//     formData += chunk;
//   });
//   request.on("end", function() {
//     var parsedFormData = querystring.parse(formData);
//     db.query("INSERT INTO users (username) VALUES ($1)",
//     [parsedFormData.username],
//     function(err, result) {
//       response.writeHead(302, {"Location": "/"});
//       response.end();;
//     });
//   });
// }

module.exports = {index: index, create: create};
