Vue.component('todo-users', {
  data: function () {
    return {
      users: []
    };
  },
  mounted: function() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers: function(cb) {
      request((json) => {
        this.users = json;
        if (typeof cb == "function")
          cb();
      }, "/users");
    }
  },
  template: "#todo-users-template"
});

var todoApp = new Vue({
  el: "#todo-container",
  data: {
    todos: []
  },
  mounted: function() {
    this.fetchTodos();
  },
  methods: {
    fetchTodos: function(cb) {
      var self = this;
      request(function (json) {
        self.todos = parseTodos(json);
        if (typeof cb == "function")
          cb();
      }, "/tasks");
    }
  }
});

function parseTodos(json) {
  return json.map(function(e) {
    var assigned = e.assign ? e.assign.map((a) => a.username) : ['no one'];
    return {title: e.title, assigned: assigned};
  })
}

function request(cb, url) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status==200) {
      var json = JSON.parse(xhr.responseText);
      cb(json);
    }
  }
  xhr.open('GET', url, true);
  xhr.send();
}
