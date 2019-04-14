const bcrypt = require('bcryptjs');
const db = require('../dbConfig');

module.exports = {
	add,
	get,
	getAll,
	findBy,
	update
}

const prisons = 'prisons';

function add(prison) {
	const password = bcrypt.hashSync(prison.password, 4);
	return db(prisons).insert({...prison, password});
}

function get(id) {
	return db(prisons).where({id}).first();
}

function getAll() {
	return db(prisons);
}

function findBy(filter) {
	return db(prisons).where(filter).first();
}

function update(id, update) {
	return db(prisons).where({id}).update(update);
}