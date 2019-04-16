const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisons = require('../../data/prisonsModel/prisonsModel');
const prisoners = require('../../data/prisonersModel/prisonersModel');

const {generateToken} = require('../helpers');

router.post('/register', async (req, res) => {
	const {username, address, name, password} = req.body;
	if(!username || !address || !name || !password){
		res.status(400).json('incomplete data');
	}else{
		try {
			const existingPrison = await prisons.findBy({username});
			if(existingPrison){
				res.status(412).json('already exists');
			} else{
				const id = await prisons.add({username, address, name, password});
				console.log(id)
				const prison = await prisons.get(id);
				const prisonersInPrison = await prisoners.findBy({prison_id: prison.id});
				const token = generateToken(prison);
				res.status(201).json({
					prison: {
						id: prison.id,
						name: prison.name,
						address: prison.address,
						prisoners: prisonersInPrison
					},
					token
				});
			}
		} catch (error) {
			console.log(error)
			res.status(500).json('server error')
		}
	}
})

router.post('/login', async (req, res) => {
	const {username, password} = req.body;
	if(!username || !password){
		res.status(400).json('incomplete data');
	} else{
		try {
			const prison = await prisons.findBy({username});
			if(prison && bcrypt.compareSync(password, prison.password)){
				const token = generateToken(prison);
				const prisonersInPrison = await prisoners.findBy({prison_id: prison.id});

				prisonersInPrison.forEach(prisoner => delete prisoner.prison_id);
				
				res.status(200).json({
					prison: {
						id: prison.id,
						name: prison.name,
						address: prison.address,
						prisoners: prisonersInPrison
					},
					token
				})
			} else{
				res.status(401).json('invalid credentials')
			}
		} catch (error) {
			console.log(error)
			res.status(500).json('server error')
		}
	}
})

module.exports = router;