var test = require("tape");
var supertest = require("supertest");
var tasksHandler = require("../src/tasksHandler.js");
var populateDb = require("../src/database/db_populate.js");
var db = require("../src/database/db_connection.js");

test("Populate the database", function(assert) {
  populateDb(function() {
    assert.end();
  });
});

test("Returns tasks in array and check property title", function(assert) {
  supertest(tasksHandler.index)
    .get("/tasks")
    .end(function(err, result) {
      if (err) {
        console.error(err);
        assert.fail();
      }
      var parsedResult = JSON.parse(result.text);
      console.log(parsedResult);
      assert.ok(parsedResult.length > 0, "has items");
      assert.ok(parsedResult[0].hasOwnProperty("title"), "item has title");
      assert.end();
    });
});

test("Create a task", function(assert) {
  supertest(tasksHandler.create)
    .post("/task/create")
    .send("title=My new task")
    .end(function(err, result) {
      if (err) {
        console.error(err);
      }
      db.query("SELECT * FROM tasks WHERE title='My new task'",
        function(err, result) {
          assert.ok(result.rows.length >= 1, "has 1 item");
          assert.end();
        });
    });
});

test("Delete a task", function(assert) {
  supertest(tasksHandler.deleteTask)
    .post("/task/delete")
    .send("title=My new task")
    .end(function(err, result) {
      if (err) {
        console.error(err);
      }
      db.query("SELECT * FROM tasks WHERE title LIKE 'My new task'",
        function(err, result) {
          assert.ok(result.rows.length == 0, "has no item");
          assert.end();
        });
    });
});

test("Build assigned tasks list", function(assert) {
  var queryResult = [
    {id: 1, title: 'Come home from work singing', user_id: 2},
    {id: 1, title: 'Come home from work singing', user_id: 1},
    {id: 2, title: 'Wake up Snow White', user_id: 4},
    {id: 3, title: 'Throw apples out in the trash!', user_id: 3},
    {id: 3, title: 'Throw apples out in the trash!', user_id: 1},
    {id: 3, title: 'Throw apples out in the trash!', user_id: 2},
    {id: 4, title: 'Call Prince Charming', user_id: 2},
    {id: 4, title: 'Call Prince Charming', user_id: 4},
  ]

  assignedTasksList(queryResult);
  assert.ok("list has 4 tasks");
  assert.end();
});

function assignedTasksList(arr) { // input will be query response
  var tasksIndex = []; // final whole object
  var obj = {}; // task temp object
  var assign = []; // array of assignees
  console.log("** INPUT **");
  console.log(arr);
  var i = 0;
  var j = 0;

  if (arr.length > 0) {
    do {
      console.log(" ");
      console.log("enter i loop => i =", i, ". j =", j);
      console.log("building task object...");
      obj = {};
      obj.id = arr[i].id;
      obj.title = arr[i].title;
      obj.assign = [];

      j = i;
      do {
        console.log("enter j loop => i =", i, ". j =", j);
        console.log("building assignees array...");
        obj['assign'].push(arr[j].user_id);
        j++;
      }
      while (j < arr.length && arr[j].id == arr[i].id);

      console.log(" ");
      console.log("pushing", obj, "to tasks list");
      tasksIndex.push(obj);
      i = j;
    }
    while (i < arr.length);
  }

  console.log(" ");
  console.log("** OUTPUT **");
  console.log(tasksIndex);
}

// test("End pool connection", function(assert) {
//   db.end(function() {
//     assert.end();
//   });
// });
