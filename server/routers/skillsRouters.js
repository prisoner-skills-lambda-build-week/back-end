const router = require('express').Router();

const skills = require('../../data/skillsModel/skillsModel');
const prisonersSkills = require('../../data/prisonersSkillsModel/prisonersSkillsModel');

const {isAuthed} = require('../helpers');

router.get('/', async (req, res) => {
	try {
		const allSkills = await skills.getAll();
		res.status(200).json(allSkills);
	} catch (error) {
		res.status(500).json('server error');
	}
});

router.get('/:id', async (req, res) => {
	const {id} = req.params;
	try {
		const skill = await skills.get(id);
		res.status(200).json(skill);
	} catch (error) {
		res.status(500).json('server error');
	}
});

router.post('/', isAuthed, async (req, res) => {
	const {name, prisoner_id: prisoners_id} = req.body;
	try {
		const existingSkill = await skills.findBy({name});
		let skills_id;
		if(!existingSkill){
			[skills_id] = await skills.add({name});
		} else{
			skills_id = existingSkill.id;
		}
		const currentSkills = await prisonersSkills.findBy({prisoners_id});

		const isNotDuplicate = currentSkills.every(p_skill => p_skill.skills_id !== skills_id);
		if(!isNotDuplicate){
			res.status(400).json('prisoner already have this skill');
			return;
		}

		const data = await prisonersSkills.add({prisoners_id, skills_id});
		res.status(201).json('succesfully created');

	} catch (error) {
		res.status(500).json('server error');
	}
});

router.delete('/', isAuthed, async (req, res) => {
	const {prisoner_id, skill_id} = req.body;
	try {
		const deleted = await prisonersSkills.remove(prisoner_id, skill_id);
		if(deleted === 0){
			res.status(404).json('skill for prisoner not found');
		} else {
			res.status(200).json('successfully deleted');
		}
	} catch (error) {
		res.status(500).json('server error');
	}
})

module.exports = router;