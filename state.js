var state = [
  {
    id: -3,
    title: 'first todo',
    assign: [1, 2, 3, 4]
  },
  {
    id: -2,
    title: 'second todo',
    assign: [2, 4]
  },
  {
    id: -1,
    title: 'third todo',
    assign: [3]
  }
]

if (typeof module !== 'undefined') {
  module.exports = state;
}
