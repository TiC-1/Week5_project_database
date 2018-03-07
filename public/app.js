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

function updateUsers(err, data) {
    if (err) {
        console.log(err);
    } else {
        users = JSON.parse(data);
        // users = [{id: 1, name: "sdasdasa"}, {id: 2, name: "basdadas"}]; // riga di test
        var form = document.getElementById("add-todo");
        users.forEach(function (user) {
          var input = document.createElement("input");
          var label = document.createElement("label")
          input.setAttribute("type", "checkbox");
          input.setAttribute("value", user.id);
          input.setAttribute("name", "users");
          label.innerText = user.name;
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
    request(upadateTask, "/tasks");
}
// updateUsers();  // riga di test
request(updateUsers, '/users');
