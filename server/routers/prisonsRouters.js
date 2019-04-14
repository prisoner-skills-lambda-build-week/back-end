const router = require('express').Router();

const prisons = require('../../data/prisonsModel/prisonsModel');

router.get('/', (req, res) => {
	res.send('prisons')
});





module.exports = router;