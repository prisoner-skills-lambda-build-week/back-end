const db = require('../dbConfig');

module.exports = {
	add,
	get,
	getAll,
	findBy,
	update,
	remove
}

const prisoners = 'prisoners';

function add(prisoner) {
	return db(prisoners).insert(prisoners);
}

function get(id) {
	return db(prisoners).where({id}).first();
}

function getAll() {
	return db(prisoners)
}

function findBy(filter) {
	return db(prisoners).where(filter);
}

function update(id, update) {
	return db(prisoners).where({id}).update(update)
}


function remove(id) {
	return db(prisoners).where({id}).del();
}