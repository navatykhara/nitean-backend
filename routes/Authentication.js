const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: '1234',
  port: 5432,
})

//If User is logged in.
const general = function (req, res, next) {
  //Case: No cookies
	try{
		//Case: Wrong Cookies
		const cookie = req.cookies['jwt'];

		const claims = jwt.verify(cookie, 'secret');
		

		if(!claims){
			
			console.log("Failed Identity")

			return res.status(401).send({
				message: 'unauthenticated'
			})
		}


		//Case: Has Cookies
		res.locals.id = claims.id; //<<<<In case shit breaks, delete this
		next()

	} catch(e){
		console.log(e);

		return res.status(401).send({
			message: 'unauthenticated'
		})
	}
}

//If User is allowed to access
const resource = function (req, res, next) {

	//Check if User has access to story
  	pool.query('SELECT * FROM story_table WHERE id = ' + req.params.story_id + ' AND author_id = ' + res.locals.id,
	[],
	(error, results) => {
		if(error){
			throw error;
		}
		console.log(results.rowCount);
		if(results.rowCount == 0){
			return res.status(401).send({
				message: 'unauthenticated'
			});
		}
		
		next();

	})	

}

module.exports = {
	general: general,
	resource: resource
	};