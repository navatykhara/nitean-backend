const express = require('express');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: '1234',
  port: 5432,
})
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const auth = require('./routes/Authentication');



const app = express();


app.use(cookieParser())

app.use(cors({
	credentials: true,
	origin: ['http://localhost:3000']
}));
app.use(express.json())

app.use((req, res, next) => {
  //console.log('Time: ', Date.now());
  next();
});

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.use(require('./routes/Logging'));
app.use(require('./routes/User'));
app.use(require('./routes/Story'));
app.use(require('./routes/Chapter'));

app.get('/ping/auth', auth.general, (req, res) => {
	res.send('Success');
});

//CREATE



app.post('/createComment', (req, res) => {
	

	let title = 'The man with a mission';
	let story_id = '1';
	pool.query('INSERT INTO comment_table (user_id, story_id, chapter_id, content, published_date) VALUES ($1, $2, $3, $4, $5)',
	[ story_id, title, "!!!", new Date(Date.now()).toISOString(), '1'],
	(error, results) => {
		if(error){
			throw error;
		}
	res.status(200).send('Chapter created with title ' + title);
	
	
	})	
	
});

//READ



//UPDATE
app.post('/updateSeasonal', (req, res) => {
	
	
	
});
//DELETE
app.post('/deleteSeasonal', (req, res) => {
	
	
	
});

app.delete('/deleteSeasonal/:seasonalId', (req, res) => {
  const seasonalId = req.params.seasonalId;

  pool.query('DELETE FROM seasonal WHERE id = $1', [seasonalId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send('Seasonal record deleted');
  });
});

app.listen(3001, () => console.log('Example app is listening on port 3001.'));