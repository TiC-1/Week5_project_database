var db = require("./database/db_connection.js");
var querystring = require("querystring");

function index(request, response) {
  db.query("SELECT *, (SELECT json_agg(users.*) FROM tasks_assignments, users WHERE tasks.id=task_id AND user_id=users.id) AS assign FROM tasks;", function(err, result) {
    if (err) {
      response.writeHead(500);
      return response.end();
    }
    response.writeHead(200, {
      "Content-Type": "application/json"
    });
    response.end(JSON.stringify(result.rows));
  });
}

function create(request, response) {
  var formData = "";
  request.on("data", function(chunk) {
    formData += chunk;
  });
  request.on("end", function() {
    var parsedFormData = querystring.parse(formData);
    db.query("INSERT INTO tasks (title) VALUES ($1) RETURNING ID", [parsedFormData.title],
      function(err, result) {
        var query = "";
        for (var i = 0; i < parsedFormData.users.length; i++) {
          query += "INSERT INTO tasks_assignments (task_id, user_id) VALUES (" + result.rows[0].id + ", " + parsedFormData.users[i] + ");";
        }
        db.query(escapeElement(query), function(err, result) {
          response.writeHead(302, {
            "Location": "/"
          });
          response.end();
        });


      });

  });
}

function escapeElement(elementRepresentation) {
  var escaped = elementRepresentation
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
  return '"' + escaped + '"'
}

function deleteTask(request, response) {
  var formData = "";
  request.on("data", function(chunk) {
    formData += chunk;
  });
  request.on("end", function() {
    var parsedFormData = querystring.parse(formData);
    db.query("DELETE FROM tasks_assignments WHERE task_id=($1); DELETE FROM tasks WHERE id=($1);", [parsedFormData.id],
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
};
