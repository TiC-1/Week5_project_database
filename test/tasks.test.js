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

test("Returns tasks list in array and check for properties", function(assert) {
  supertest(tasksHandler.index)
    .get("/tasks")
    .end(function(err, result) {
      if (err) {
        console.error(err);
        assert.fail();
      }
      var parsedResult = JSON.parse(result.text);
      console.log(parsedResult);
      assert.ok(parsedResult.length > 0, "list has items");
      assert.ok(parsedResult[0].hasOwnProperty("assign"), "item has assign");
      assert.ok(parsedResult[0].assign[0].hasOwnProperty("username"), "assign has username");
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


// test("End pool connection", function(assert) {
//   db.end(function() {
//     assert.end();
//   });
// });
