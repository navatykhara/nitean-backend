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


//CREATE

/*
	Create User
	
	Input: {
		username,
		email,
		password
	}
*/
router.post('/user', async (req, res) => {
	
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
		
	pool.query('INSERT INTO user_table (username, email, password, pp, bio, registration_date) VALUES ($1, $2, $3, $4, $5, $6)',
	[ req.body.username, req.body.email, hashedPassword, null, null, new Date(Date.now()).toISOString()],
	(error, results) => {
		if(error){
			throw error;
		}
	res.status(200).send("1111")
	
	})	
	
});

//READ

/*
	Get all Users
	
*/

router.get('/user', (req, res) => {
	
	pool.query('SELECT * FROM user_table',
	[],
	(error, results) => {
		if(error){
			throw error;
		}
	
	
	res.status(200).send(results)
	
	})	

	
});

/*
	Get User with ID
	
	Input: {
		id
	}
*/

router.get('/user/:id', (req, res) => {
	
	pool.query('SELECT * FROM user_table WHERE id = ' + req.params.id,
	[],
	(error, results) => {
		if(error){
			throw error;
		}
	res.status(200).send(results)
	})	

	
});

//UPDATE


//DELETE



module.exports = router;