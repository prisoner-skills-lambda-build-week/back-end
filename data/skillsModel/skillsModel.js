const db = require('../dbConfig');

module.exports = {
	add,
	get,
	getAll,
	update,
	remove
}

const skills = 'skills';

function add(skills) {
	return db(skills).insert(skills);
}

function get(id) {
	return db(skills).where({id});
}

function getAll() {
	return db(skills);
}

function update(id, update) {
	return db(skills).where({id}).update(update);
}

function remove(id) {
	return db(skills).where({id}).del();
}