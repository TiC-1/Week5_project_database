var state = [
  { id: 1, description: 'first todo', assign: ['Al','Claudio','Matte', 'Iannis'] , done: false },
  { id: 2, description: 'second todo', assign: ['Al','Claudio','Matte', 'Iannis'], done: false },
  { id: 3, description: 'third todo', assign: ['Al','Claudio','Matte', 'Iannis'], done: false },
];

if (typeof module !== 'undefined') {
  module.exports = state;
}
