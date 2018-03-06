var form = document.getElementById("add-todo");

getUsersList();

function getUsersList() {
  var str = "/users";
  getUsers(updateUsers, str);
}

function updateUsers(state) {
  if (form) renderUsers(state);
}

function renderUsers(state) {
  form.appendChild(newChild)
  // Create a new <ul></ul> with 'acList' class
  var wordUL_node = document.createElement('ul');
  wordUL_node.setAttribute('class', 'acList');
  // Insert <li> calling createLI function
  state.forEach(function(item) {
    wordUL_node.appendChild(createLI(item));
  });
  // Replace previous 'container' content (<ul>...</ul>)
  container.replaceChild(wordUL_node, container.firstChild);
};


// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  var sortTodosForm = document.getElementById('sort-todos');
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');

  var state = [
    { id: -3, description: 'first todo', assign: ['Al'] , done: false },
    { id: -2, description: 'second todo', assign: ['Al'], done: false },
    { id: -1, description: 'third todo', assign: ['Al'], done: false },
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {

    // Create <li> tag
    var todoNode = document.createElement('li');
    if (todo.done){
      todoNode.className = "checked";
    }
    todoNode.dataset.id = todo.id;
    // MARK BUTTON
    // Create <button> tag
    var markTodoButtonNode = document.createElement('button');
    // Add text insinde <button> and </button> tags
    markTodoButtonNode.textContent = todo.done;
    // Add a class
    markTodoButtonNode.className = "markButton";
    // Call funtion markTodo in logic.js
    markTodoButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.markTodo(state, event.target.parentElement.dataset.id);
      update(newState);


    });
    // Add the button to todoNode
    todoNode.appendChild(markTodoButtonNode);


    // DESCRIPTION
    // Create <span> tag
    var descriptionNode = document.createElement('span');
    // Add a class
    descriptionNode.className = "description";
    // Write todo description property value in descriptionNode
    descriptionNode.textContent = todo.description;
    // Add descriptionNode as a toNode child
    todoNode.appendChild(descriptionNode);


    // DELETE BUTTON
    // Add <button> tag
    var deleteButtonNode = document.createElement('button');
    // Text to button
    deleteButtonNode.textContent = "Delete";
    // Add a class
    deleteButtonNode.className = "deleteButton";
    // Call funtion deleteTodo in logic.js
    deleteButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.deleteTodo(state, event.target.parentElement.dataset.id);
      update(newState);
    });
    // Add the button to todoNode
    todoNode.appendChild(deleteButtonNode);

    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function(event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?

      // Prevent to send the form
      event.preventDefault();

      // Get the value of what's is in the input field of the form
      // and assign it to a var to use it easily
      var inputNewTodo = event.target.querySelector("input").value;
      // Test if input value exists
      if (inputNewTodo) {
        // Assign it to 'description'
        var description = inputNewTodo; // event.target ....
        // delete text in input field for next input
        event.target.querySelector("input").value = "";
        // hint: todoFunctions.addTodo
        var newState = todoFunctions.addTodo(state, description); // ?? change this!
        update(newState);
      }
    });
  };

  // When 'sort button' is clicked
  if (sortTodosForm) {
    sortTodosForm.addEventListener('submit', function(event) {

      // Prevent to send the form
      event.preventDefault();

      var newState = todoFunctions.sortTodos(state , todoFunctions.sortByDescription);
      update(newState);

    });

  }

  // Stats
  var updateStats = function(state) {
    // Call statTodos funtion in logic.js to proccess 'state'
    var stateStats = todoFunctions.statTodos(state);
    // DOM-manipulation to display 'stateStats'
    var statsNode = document.querySelector(".header").querySelector('.stats');
    statsNode.textContent = "Total: " + stateStats.total + " / " + "Done: " + stateStats.done +  " / " + "Undone: " + stateStats.undone;
    statsNode.appendChild(statsNode.textContent);
  }


  // you should not need to change this function
  var update = function(newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement('ul');

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);

    // call updateStats function
    updateStats(state);
  };

  if (container) renderState(state);
})//end of function
();//function argument???
