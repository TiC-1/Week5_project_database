var state = [
  { id: -3, description: 'first todo', assign: ['Al','Claudio','Matte', 'Iannis'] , done: false },
  { id: -2, description: 'second todo', assign: ['Al','Claudio','Matte', 'Iannis'], done: false },
  { id: -1, description: 'third todo', assign: ['Al','Claudio','Matte', 'Iannis'], done: false },
];

if (typeof module !== 'undefined') {
  module.exports = state;
}
