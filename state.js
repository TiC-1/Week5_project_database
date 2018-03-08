var state = [{
  "id": 1,
  "title": "Come home from work singing",
  "assign": [{
    "id": 1,
    "username": "Grumpy"
  }, {
    "id": 2,
    "username": "Happy"
  }]
}, {
  "id": 2,
  "title": "Wake up Snow White",
  "assign": [{
    "id": 4,
    "username": "Sneezy"
  }]
}, {
  "id": 3,
  "title": "Throw apples out in the trash!",
  "assign": [{
    "id": 1,
    "username": "Grumpy"
  }, {
    "id": 2,
    "username": "Happy"
  }, {
    "id": 3,
    "username": "Sleepy"
  }]
}, {
  "id": 4,
  "title": "Call Prince Charming",
  "assign": [{
    "id": 3,
    "username": "Sleepy"
  }, {
    "id": 4,
    "username": "Sneezy"
  }]
}];


if (typeof module !== 'undefined') {
  module.exports = state;
}
