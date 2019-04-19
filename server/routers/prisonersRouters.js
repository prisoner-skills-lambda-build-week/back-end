const router = require('express').Router();

const prisons = require('../../data/prisonsModel/prisonsModel');
const prisoners = require('../../data/prisonersModel/prisonersModel');
const skills = require('../../data/skillsModel/skillsModel');
const prisonersSkills = require('../../data/prisonersSkillsModel/prisonersSkillsModel');

const {isAuthed} = require('../helpers');

router.get('/', async (req, res) => {
	try {
		const allPrisoners = await prisoners.getAll();
		res.status(200).json(allPrisoners);
	} catch (error) {
		res.status(500).json('server error');
	}
});

router.get('/:id', async (req, res) => {
	const {id: prisoners_id} = req.params;
	try {
		const prisoner = await prisoners.get(prisoners_id);
		if(!prisoner){
			res.status(404).json('prisoner not found');
		}else{
			const p_skillsPair = await prisonersSkills.findBy({prisoners_id});

			const skillsPromises = p_skillsPair.map(async pair => {
				return await skills.get(pair.skills_id);
			})  

			const p_skills = await Promise.all(skillsPromises);
			res.status(200).json({...prisoner, skills: p_skills});
		}
	} catch (error) {
		res.status(500).json('server error');
	}
});

router.post('/', isAuthed, async (req, res) => {
	const {name, prison_id} = req.body;
	if(!name || !prison_id){
		res.status(400).json('incomplete data')
	} else{
		try {
			const prisonExists = await prisons.get(prison_id);
			if(!prisonExists){
				res.status(404).json('prison not found');
			} else{
				// TODO: should error if prison_id does not exist
				const returned = await prisoners.add({name, prison_id});
				res.status(201).json(returned[0].id);
			}
		} catch (error) {
			res.status(500).json('server error');
		}
	}
});

router.put('/:id', isAuthed, async (req, res) => {
	const {id} = req.params;
	const {name, prison_id} = req.body;
	if(!name || !prison_id){
		res.status(400).json('incomplete data');
	} else{
		try {
			const updatedPrisoner = await prisoners.update(id, req.body);
			res.status(200).json(updatedPrisoner);
		} catch (error) {
			res.status(500).json('server error');
		}
	}
});

router.delete('/:id', isAuthed, async (req, res) => {
	const {id} = req.params;
	try {
		const prisonerExists = await prisoners.get(id);
		if(!prisonerExists){
			res.status(404).json('prisoner not found');
		}else{
			const ids = await prisoners.remove(id);
			res.status(200).json('successfully deleted');
		}
	} catch (error) {
		console.log(error)
		res.status(500).json('server error');
	}
});

module.exports = router;