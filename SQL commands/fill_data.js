const { setTimeout } = require("timers/promises");


// the hello world program
console.log('Hello World');




async function addStory(){
	const title = await fetch('https://baconipsum.com/api/?type=meat-and-filler&sentences=1',
	{
		method: 'GET',
	});

	var title_data = await title.json();
	

	const description = await fetch('https://baconipsum.com/api/?type=meat-and-filler&sentences=1',
	{
		method: 'GET',
	});

	var description_data = await description.json();
	
	
	const response = await fetch('http://localhost:3001/story',
	{
		method: 'POST',
		body: JSON.stringify({
			"title": title_data[0],
			"description": description_data[0],
			"genre": "TEST",
			"cover_image": 'https://baconmockup.com/150/150'
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
		
}


async function chapterGet(id, count){
	
	console.log(id + " " + count);
	const title = await fetch('https://baconipsum.com/api/?type=meat-and-filler&sentences=1',
	{
		method: 'GET',
	});

	var title_data = await title.json();
	
	console.log(title_data);
	const chapter = await fetch('https://baconipsum.com/api/?type=meat-and-filler',
	{
		method: 'GET',
	});

	var chapter_data = await chapter.json();
	
	const response = await fetch('http://localhost:3001/story/'+id+'/chapter/'+count,
	{
		method: 'POST',
		body: JSON.stringify({
			"title": title_data[0],
			"content": chapter_data[0],
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	
}
//chapterGet();


async function exec(){
	for (let i = 1; i <= 20; i++){
		addStory();
		await setTimeout(1000);

		for (let j = 1; j <= 5; j++){
			chapterGet(i, j);
			await setTimeout(1000);

		}
		
	}
}
//addStory();
exec();