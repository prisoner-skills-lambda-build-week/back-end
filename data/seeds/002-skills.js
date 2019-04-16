
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('skills').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('skills').insert([
        {name: 'React'},
        {name: 'Nodejs'},
        {name: 'Design'},
      ]);
    });
};
