const router = require('express').Router();

const skills = require('../../data/skillsModel/skillsModel');

router.get('/', (req, res) => {
	res.send('skills')
})

module.exports = router;