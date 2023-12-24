const express = require('express');
const router = express.Router();
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: '1234',
  port: 5432,
})

const auth = require('./Authentication');

//CREATE
router.post('/story', auth.general, (req, res) => {
	
	//I changed to 1
	pool.query('INSERT INTO story_table (title, author_id, description, genre, cover_image, creation_date, last_updated_date) VALUES ($1, $2, $3, $4, $5, $6, $7)',
	[ req.body.title, res.locals.id, req.body.description, req.body.genre, 
	req.body.cover_image, new Date(Date.now()).toISOString(), new Date(Date.now()).toISOString()],
	(error, results) => {
		if(error){
			throw error;
		}
	res.status(200).send('Story created with title ' + req.body.title);
	
	
	})	
	
});

//READ
router.get('/story', (req, res) => {
	
	pool.query('SELECT * FROM story_table',
	[],
	(error, results) => {
		if(error){
			throw error;
		}
	res.status(200).send(results)
	
	})	

	
});


router.get('/story/dashboard', auth.general, (req, res) => {
	console.log(res.locals.id)
	pool.query('SELECT * FROM story_table WHERE author_id = ' + res.locals.id,
	[],
	(error, results) => {
		if(error){
			throw error;
		}
	res.status(200).send(results)
	})	

	
});

router.get('/story/:id', (req, res) => {
	
	pool.query('SELECT * FROM story_table WHERE id = ' + req.params.id,
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