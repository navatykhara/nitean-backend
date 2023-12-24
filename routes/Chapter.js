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

router.post('/story/:story_id/chapter/:chapter_id', auth.general, auth.resource, (req, res) => {
	
	pool.query('INSERT INTO chapter_table (story_id, title, content, published_date, chapter_number) VALUES ($1, $2, $3, $4, $5)',
	[ req.params.story_id, req.body.title, req.body.content, new Date(Date.now()).toISOString(), req.params.chapter_id],
	(error, results) => {
		if(error){
			throw error;
		}
	res.status(200).send('Chapter created with title ');

	})	
	
	
	
});


//READ

router.get('/story/:story_id/chapter', (req, res) => {
	
	
	
	pool.query('SELECT * FROM chapter_table WHERE story_id = ' + req.params.story_id,
	[],
	(error, results) => {
		if(error){
			throw error;
		}
	res.status(200).send(results)
	})	
	
});

router.get('/story/:story_id/chapter/:chapter_id', (req, res) => {
	
	console.log(req.params.chapter_id)
	console.log(req.params.story_id)
	console.log(req.params.chapter_id instanceof Number)
	console.log(req.params.story_id instanceof Number)
	
	pool.query('SELECT * FROM chapter_table WHERE chapter_number = ' + req.params.chapter_id + ' AND story_id = ' + req.params.story_id,
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