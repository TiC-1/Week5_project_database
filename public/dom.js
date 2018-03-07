// var form = document.getElementById("add-todo");
var getUsers = require("./logic.js");

function getUsersList() {
  var str = "/users";
  getUsers(updateUsers, str);
}

getUsersList(); // posso lanciarla così?!

function updateUsers(nameArray) {
  renderUsers(nameArray);
}

function renderUsers(nameArray) {
  var nameInput_node = document.createElement("input");
  nameArray.forEach(function (item) {
    nameInput_node.appendChild(item);
  });
};

// div "acPreview" (autocomplete Preview) will be the place where we'll do DOM manipulation
var container = document.getElementById("todo-container");


// Function to track any change in the form text field in index.html

function getInputValue() {
  var strTodo = document.getElementById("add-todo").value;
  // Launch main (or first) function in logic.js with updateDOM as a callback
  getWordlist(updateDOM, str);
}


// General function to update DOM
// (We keep it like this for potential further developments)
function updateDOM(state) {
  if (container) renderState(state);
}


// General function to render the new state
function renderState(state) {
  // Create a new <ul></ul> with 'acList' class
  var todoListNode = document.createElement('ul');
  todoListNode.setAttribute('class', 'acList');
  // Insert <li> calling createLI function
  state.forEach(function(todo) {
    todoListNode.appendChild(createTodoNode(todo));
  });
  // Replace previous 'container' content (<ul>...</ul>)
  container.replaceChild(todoListNode, container.firstChild);
};


// General function to create list items
var createTodoNode = function(todo) {
  // Create a new <li></li>
var todoNode = document.createElement('li');  //Add some class to it to style it
todoNode.setAttribute('class', 'acWord');
  // Add son content from the returned array from server
  todoNode.textContent = todo;
  // Return li to the parent function (renderState)
  return todoNode;
};
