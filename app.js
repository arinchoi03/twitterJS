const express = require( 'express' );
const app = express(); // creates an instance of an express application
var bodyParser = require('body-parser'); //reads body of requests
var chalk = require('chalk');
var volleyball = require('volleyball');
var nunjucks = require('nunjucks');
var routes = require('./routes')

//BODY PARSER CONFIGS
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//VOLLEYBALL (optional)
app.use(volleyball) //does same thing as below app.use code
// app.use(function(req, res, next) {
//   console.log(chalk.yellow((req.method + req.path + res.statusCode)));
//   next();
// })

//NUNJUCKS CONFIGURATION
app.set('view engine', 'html'); //.render command comes here
app.engine('html', nunjucks.render); //when giving html files to res.render, tells it to use nunjucks.render
nunjucks.configure('views', {noCache: true}) //points nunjucks to the proper directory
//noCache - only renders data if it has changed

// GOES TO ROUTES FILE
app.use(routes);


app.get('/', function(req, res, next) {
  var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
  res.render('index', {title: 'Hall of Fame', people: people})
})

app.use('/special/', function(req, res, next) {
  res.send('Am I special?')
})

app.post('/modernism', function(req, res, next) {
  res.send('I\'m so modern')
})


app.listen(3000, function () {console.log(chalk.magenta('listening on server 3000'))});
