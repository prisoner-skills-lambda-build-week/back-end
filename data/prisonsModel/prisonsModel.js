const db = require('../dbConfig');

module.exports = {
	add,
	get,
	getAll,
	update
}

const prisons = 'prisons';

function add(prison) {
	return db(prisons).insert(prison);
}

function get(id) {
	return db(prisons).where({id}).first();
}

function getAll() {
	return db(prisons);
}

function update(id, update) {
	return db(prisons).where({id}).update(update);
}