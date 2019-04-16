
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('prisons').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('prisons').insert([
        {username: 'qwerty', address: '1901 D St SE, Washington, DC 20003', name: 'DC Central Detention Facility', password: 'pass'},
        {username: 'asd', address: '1435 N Courthouse Rd, Arlington, VA 22201', name: 'Arlington County Jail', password: 'pass'},
      ]);
    });
};
