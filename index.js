//stock market portfolio app

const express = require('express')
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000; 

//middleware - parser
app.use(bodyParser.urlencoded({extended: false}));


//API Key
//pk_bf74f4ec6bab499c9008bd135ddf33d5


//api function
function call_api(finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker +'/quote?token=pk_bf74f4ec6bab499c9008bd135ddf33d5', { json: true }, (err, res, body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
		finishedAPI(body);
		};
	});
};



// set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff";

//set handlebar index GET route
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
		res.render('home', {
    	stock: doneAPI
    });
	}, "fb");
});



//set handlebar index POST route
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
		//posted_info = req.body.stock_ticker;
		res.render('home', {
    	stock: doneAPI,
    });
	}, req.body.stock_ticker);
});


//about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

//static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port' + PORT));