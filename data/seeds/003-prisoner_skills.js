
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('prisoners_skills').del()
    .then(function () {
      // Inserts seed entries
      return knex('prisoners_skills').insert([
        {prisoners_id: 1, skills_id: 1},
        {prisoners_id: 1, skills_id: 2},
        {prisoners_id: 2, skills_id: 3},
        {prisoners_id: 2, skills_id: 1},
        {prisoners_id: 2, skills_id: 2},
      ]);
    });
};
