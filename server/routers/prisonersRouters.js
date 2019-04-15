const router = require('express').Router();

const prisoners = require('../../data/prisonersModel/prisonersModel');

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
	const {id} = req.params;
	try {
		const prisoner = await prisoners.get(id);
		if(!prisoner){
			res.status(404).json('prisoner not found');
		}else{
			res.status(200).json(prisoner);
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
			const [id] = await prisoners.add({name, prison_id});
			res.status(201).json(id);
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
			const updatedPrisoner = await prisoners.update(id, {name, prison_id});
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
			res.status(200).json('successfully deleted');
		}
	} catch (error) {
		res.status(500).json('server error');
	}
});

module.exports = router;