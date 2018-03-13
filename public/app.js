// Generic funtion to send a request and parse the returned string into an object
function request(cb, url) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) { // When request is completed
      if (xhr.status === 200) { // When request succeeded
        var responseObj = JSON.parse(xhr.responseText);
        cb(null, responseObj); // Launch callback function
      } else { // In case of error in request
        var errorMessage = xhr.responseText;
        cb("Error " + url + " " + errorMessage);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

// DOM Manipulation ******

var users = [];
var tasks = [];

function updateUsers(err, data) {
  if (err) {
    console.log(err);
  } else {
    users = data;
    var form = document.getElementById("add-todo");
    var inputContainer = document.createElement("div");

    users.forEach(function (user) {
      var input = document.createElement("input");
      var label = document.createElement("label")
      input.setAttribute("type", "checkbox");
      input.setAttribute("value", user.id);
      input.setAttribute("name", "users");
      input.setAttribute("class", "check")
      label.innerText = user.username;
      label.appendChild(input);
      inputContainer.appendChild(label);
      form.appendChild(inputContainer);
    });
  }
}

function upadateTask (err, data) {
  if (err) {
    console.log(err);
  } else {
    tasks = data;
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
  var assignee = todo.assign;
  if(assignee) {
    for (var i = 0; i < assignee.length; i++) {
      nameOutput.push(assignee[i].username);
    }
    nameOutput = nameOutput.join(", ");
  } else {
    nameOutput = "no one";
  }
  todoNode.innerHTML = todo.title + "<br>" + " assigned to: " + nameOutput;
  return todoNode;
};

request(updateUsers, '/users');
request(upadateTask, '/tasks');
