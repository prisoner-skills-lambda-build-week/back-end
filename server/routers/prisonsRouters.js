const router = require('express').Router();

const prisons = require('../../data/prisonsModel/prisonsModel');
const prisoners = require('../../data/prisonersModel/prisonersModel');

const {isAuthed} = require('../helpers');

router.get('/', async (req, res) => {
	const allPrisons = await prisons.getAll();
	allPrisons.forEach(prison => delete prison.password);
	res.status(200).json(allPrisons);
});

router.get('/:id', async (req, res) => {
	const {id: prison_id} = req.params;
	try {
		const prison = await prisons.get(prison_id);
		if(!prison){
			res.status(404).json('prison not found');
		} else{
			delete prison.password;
			delete prison.username;
			const prisonersInPrison = await prisoners.findBy({prison_id});

			prisonersInPrison.forEach(prisoner => delete prisoner.prison_id);

			res.status(200).json({
				...prison,
				prisoners: prisonersInPrison
			});
		}
	} catch (error) {
		res.status(500).json('server error');
	}
});

router.put('/:id', isAuthed, async (req, res) => {
	const {id} = req.params;
	const updates = req.body;

	try {
		const updatedPrison = await prisons.update(id, updates);
		res.status(200).json(updatedPrison);
	} catch (error) {
		res.status(500).json('server error');
	}
});

router.delete('/:id', isAuthed, async (req, res) => {
	const {id} = req.params;
	try {
		const prisonExists = await prisons.get(id);
		if(!prisonExists){
			res.status(404).json('prison not found')
		} else{
			const ids = await prisons.remove(id);
			res.status(200).json('successfully deleted');
		}
	} catch (error) {
		res.status(500).json('server error');
	}
});

module.exports = router;