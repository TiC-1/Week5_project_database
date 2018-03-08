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
        users = data;
        // users = [{id: 1, username: "alberto"}, {id: 2, username: "claudio"}, {id: 3, username: "matteo"}, {id: 4, username: "iannis"}, {id: 5, username: "giulia"}]; // riga di test
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

    }
}

function upadateTask (err, data) {
  if (err) {
    console.log(err);
  } else {
    tasks = data;
    // tasks = [
    //   { id: -3, description: 'first todo', assign: [1, 2, 3, 4]},
    //   { id: -2, description: 'second todo', assign: [1,3,4]},
    //   { id: -1, description: 'third todo', assign: [2,4,5]},
    // ];
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
  todoNode.setAttribute("class", "todo-listitem");
  // filter username
  var nameOutput = [];
  for (var i = 0; i < todo.assign.length; i++) {

    nameOutput.push(todo.assign[i].username);

  }


  todoNode.innerHTML = todo.title + "<br>" + " assigned to: " + nameOutput.join(", ");
  return todoNode;
};

request(updateUsers, '/users');
request(upadateTask, "/tasks");
