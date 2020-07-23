//stock market portfolio app

const express = require('express')
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');


const PORT = process.env.PORT || 5000; 

// set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff";

//set handlebar routes
app.get('/', function (req, res) {
    res.render('home', {
    	stuff: otherstuff
    });
});

//static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port' + PORT));