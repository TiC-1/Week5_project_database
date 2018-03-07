// Generic funtion to send a request and parse the returned string into an object
function request(cb, url) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) { // When request is completed
      if (xhr.status === 200) { // When request succeeded
        var responseObj = JSON.parse(xhr.responseText);
        cb(null, responseObj); // Launch callback function (updateDOM)
      } else { // In case of error in request
        var errorMessage = xhr.responseText;
        cb("Error " + url + " " + errorMessage);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

var users = [];
var tasks = [];

function updateUsers(err, data) {
    if (err) {
        console.log(err);
    } else {
        // users = JSON.parse(data);
        users = [{id: 1, username: "alberto"}, {id: 2, username: "claudio"}, {id: 3, username: "matteo"}, {id: 4, username: "iannis"}, {id: 5, username: "giulia"}]; // riga di test
        var form = document.getElementById("add-todo");
        users.forEach(function (user) {
          var input = document.createElement("input");
          var label = document.createElement("label")
          input.setAttribute("type", "checkbox");
          input.setAttribute("value", user.id);
          input.setAttribute("name", "users");
          label.innerText = user.username;
          label.appendChild(input);
          form.appendChild(label);

        });

        // var table = document.getElementById("users-table");
        // /* create a row in table for each user returned from DB */
        // users.forEach(function(user) {
        //     var row = document.createElement("tr");
        //     var name = document.createElement("td");
        //     name.innerHTML = user.name;
        //     row.appendChild(name);
        //     var location = document.createElement("td");
        //     location.innerHTML = user.location;
        //     row.appendChild(location);
        //     table.appendChild(row);
        // });
    }
    // request(upadateTask, "/tasks");
}

function upadateTask (err, data) {
  if (err) {
    console.log(err);
  } else {
    // tasks = JSON.parse(data);
    tasks = [
      { id: -3, description: 'first todo', assign: [1, 2, 3, 4]},
      { id: -2, description: 'second todo', assign: [1,3,4]},
      { id: -1, description: 'third todo', assign: [2,4,5]},
    ];
    var container = document.getElementById("todo-container");
    var todoListNode = document.createElement("ul");
    tasks.forEach(function (todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });
    container.replaceChild(todoListNode, container.firstChild);

  }
}

var createTodoNode = function (todo) {

  var todoNode = document.createElement("li");
  todoNode.setAttribute("class", "value");
  // filter username
  var idArray = todo.assign;
  var nameOutput = [];
  for (var i = 0; i < idArray.length; i++) {
    for (var j = 0; j < users.length; j++) {
      if (idArray[i] == users[j].id) {
        nameOutput.push(users[j].username);
      }
    }

  }




  todoNode.innerHTML = todo.description + " assigned to: " + nameOutput.join(", ");
  return todoNode;
};

// request(updateUsers, '/users');

updateUsers();  // riga di test
upadateTask();
