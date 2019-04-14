const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisons = require('../../data/prisonsModel/prisonsModel');
const prisoners = require('../../data/prisonersModel/prisonersModel');

const secret = process.env.JWT_SECRET || 'some string';

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
				const [id] = await prisons.add({username, address, name, password});
				const prison = await prisons.get(id);
				const token = generateToken(prison);
				res.status(201).json({
					id,
					token
				});
			}
		} catch (error) {
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
				
				res.status(200).json({
					token,
					prison: {
						id: prison.id,
						name: prison.name,
						address: prison.address,
						prisoners: prisonersInPrison
					}
				})
			} else{
				res.status(401).json('invalid credentials')
			}
		} catch (error) {
			res.status(500).json('server error')
		}
	}
})

const generateToken = prison => {
	const payload = {
		subject: prison.id,
		name: prison.name
	}

	const options = {
		expiresIn: '1d'
	}

	return jwt.sign(payload, secret, options);
}

module.exports = router;