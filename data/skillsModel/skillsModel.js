const db = require('../dbConfig');

module.exports = {
	add,
	get,
	getAll,
	findBy,
	update,
	remove
}

const skills = 'skills';

function add(skill) {
	return db(skills).insert(skill);
}

function get(id) {
	return db(skills).where({id});
}

function getAll() {
	return db(skills);
}

function findBy(filter) {
	return db(skills).where(filter).first();
}

function update(id, update) {
	return db(skills).where({id}).update(update);
}

function remove(id) {
	return db(skills).where({id}).del();
}