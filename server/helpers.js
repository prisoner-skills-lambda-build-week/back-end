const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'some string';

module.exports = {
	generateToken,
	isAuthed
}

function generateToken(prison ) {
	const payload = {
		subject: prison.id,
		name: prison.name
	}

	const options = {
		expiresIn: '1d'
	}

	return jwt.sign(payload, secret, options);
}

function isAuthed(req, res, next) {
	const token = req.headers.authorization;
	if(!token){
		res.status(401).json('no credentials');
	} else{
		next();
	}
}