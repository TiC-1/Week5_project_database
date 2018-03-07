var state = [

  {
    id: -3,
    title: 'first todo',
    assign: [
      {id: 1, name: 'Al'},
      {id: 2, name: 'Claudio'},
      {id: 3, name: 'Matte'},
      {id: 4, name: 'Iannis'}
      ]
  },

  {
    id: -2,
    title: 'second todo',
    assign: [
      {id: 2, name: 'Claudio'},
      {id: 4, name: 'Iannis'}
      ]
  },

  {
    id: -1,
    title: 'third todo',
    assign: [
      {id: 3, name: 'Matte'}
      ]
  }
]

if (typeof module !== 'undefined') {
  module.exports = state;
}
