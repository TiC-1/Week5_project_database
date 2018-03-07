var test = require("tape");
var supertest = require("supertest");
var updateUsers = require("./dom.js");

var nameArray = ["A", "B", "C"];

test("User Test Array", function(assert) {
  updateUsers(nameArray);
  console.log(nameArray);

  // assert.equal(
  // document.querySelector(".acList").textContent,
  //   "AaronAaronicAaronicalAaroniteAaroniticAaruAbabaAbabdehAbabua", "there is not a ul!!!");
  //
  // assert.equal(
  //   document.querySelectorAll("#acPreview li").length,
  //   10,
  //   "Inserts 10 words");
});
