const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: '1234',
  port: 5432,
})


router.post('/login', (req, res) => {
		
	pool.query('SELECT id, username, password FROM user_table WHERE username = \'' + req.body.username + '\'',
	[],
	async (error, results) => {
		if(error){
			throw error;
		}
		
		if(!results.rows[0]){
			return res.status(404).send({
				message: 'username not found'
			})
		}		
		if(!await bcrypt.compare(req.body.password, results.rows[0].password)){
			return res.status(400).send({
				message: 'invalid credentials'
			})
		}	
		
		const token = jwt.sign({'id': results.rows[0].id}, 'secret');
		
		res.cookie('jwt', token, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000 // 1 day
			
		});
		
		res.status(200).send({message: 'success'})
	
	})	
	
});

router.post('/logout', (req, res) => {
	
	res.cookie('jwt', '', {maxAge: 0});
	
	res.status(200).send({message: 'success'});

	
});

module.exports = router;