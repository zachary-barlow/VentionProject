
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {
          id: 1, 
          title: 'Book 1', 
          author: 'Some Guy', 
          publisher: 'publisher', 
          yearPublished: '2018', 
          price: 42.24, 
          quantity: 3
        },
        {
          id: 2, 
          title: 'Book 2', 
          author: 'Some Dude', 
          publisher: 'publisher', 
          yearPublished: '2002', 
          price: 15.50, 
          quantity: 3
        },
        {
          id: 3, 
          title: 'Book 3', 
          author: 'Some Other Guy', 
          publisher: 'publisher', 
          yearPublished: '2020', 
          price: 19.99, 
          quantity: 37
        },
        {
          id: 4, 
          title: 'Book 4', 
          author: 'Some Girl', 
          publisher: 'publisher', 
          yearPublished: '1983', 
          price: 11.99, 
          quantity: 1
        },
      ]);
    });
};
