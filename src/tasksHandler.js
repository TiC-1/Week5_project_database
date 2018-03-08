var db = require("./database/db_connection.js");
var querystring = require("querystring");

function index(request, response) {
  db.query("SELECT * FROM tasks", function(err, result) {
    if(err) {
      response.writeHead(500);
      return response.end();
    }
    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    response.end(JSON.stringify(result.rows));
  });
}

function index2(request, response) {
  db.query("SELECT ta.task_id AS id, t.title, ta.user_id FROM users AS u, tasks AS t, tasks_assignments AS ta WHERE u.id = ta.user_id AND t.id = ta.task_id;", function(err, result) {
    if (err) {
      response.writeHead(500);
      return response.end();
    }
    response.writeHead(200, {
      "Content-Type": "application/json"
    });
    response.end(JSON.stringify(result.rows));
  });
  cb(JSON.stringify(result.rows));
}

function create(request, response) {
  var formData = "";
  request.on("data", function(chunk) {
    formData += chunk;
  });
  request.on("end", function() {
    var parsedFormData = querystring.parse(formData);
    db.query("INSERT INTO tasks (title) VALUES ($1)", [parsedFormData.title],
      function(err, result) {
        response.writeHead(302, {
          "Location": "/"
        });
        response.end();;
      });
  });
}

function deleteTask(request, response) {
  var formData = "";
  request.on("data", function(chunk) {
    formData += chunk;
  });
  request.on("end", function() {
    var parsedFormData = querystring.parse(formData);
    db.query("DELETE FROM tasks WHERE title=($1)", [parsedFormData.title],
      function(err, result) {
        response.writeHead(302, {
          "Location": "/"
        });
        response.end();;
      });
  });
}

module.exports = {
  index: index,
  create: create,
  deleteTask: deleteTask,
  index2: index2
};
