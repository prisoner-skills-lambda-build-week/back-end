
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('prisoners').del()
    .then(function () {
      // Inserts seed entries
      return knex('prisoners').insert([
        {name: 'Joe', prison_id: 1},
        {name: 'Jojo', prison_id: 1},
        {name: 'Xee', prison_id: 2},
        {name: 'Jin', prison_id: 2},
      ]);
    });
};
