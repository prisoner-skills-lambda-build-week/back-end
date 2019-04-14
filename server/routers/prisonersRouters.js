const router = require('express').Router();

const prisoners = require('../../data/prisonersModel/prisonersModel');

router.get('/', (req, res) => {
	res.send('prisoners')
})

module.exports = router;