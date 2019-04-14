
exports.up = function(knex, Promise) {
    return knex.schema.createTable('prisons', col => {
        col.increments();
        col.string('username').notNullable().unique();
        col.string('address').notNullable();
        col.string('name').notNullable();
        col.string('password').notNullable();
    })
    .createTable('prisoners', col => {
        col.increments();
        col.string('name').notNullable();
        col.integer('prison_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('Prisons')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE');
        col.boolean('canHaveWorkLeave').defaultTo(false);
    })
    .createTable('skills', col => {
        col.increments();
        col.string('name').notNullable();
    })
    .createTable('prisoners_skills', col => {
        col.increments();
        col.integer('prisoners_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('prisoners')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
        col.integer('skills_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('skills')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
    })
}

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('prisons')
        .dropTableIfExists('prisoners')
        .dropTableIfExists('skills')
        .dropTableIfExists('prisoners_skills')
};
