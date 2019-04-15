const db = require('../dbConfig');

module.exports = {
	add,
	get,
	getAll,
	update,
	remove,
}

const prisoners_skills = 'prisoners_skills';

function add(p_skill) {
	return db(prisoners_skills).insert(p_skill);
}

function get(id) {
	return db(prisoners_skills).where(id).first();
}

function getAll() {
	return db(prisoners_skills);
}

function update(id, update) {
	return db(prisoners_skills).where({id}).update(update);
}

function remove(id) {
	return db(prisoners_skills).where({id}).del();
}