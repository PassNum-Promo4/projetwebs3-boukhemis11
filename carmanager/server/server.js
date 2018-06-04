var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken');
var config = require('./config');

var user = require('./routes/user.js');
var voiture = require('./routes/voiture.js');

var port = process.env.PORT || config.serverport;

mongoose.connect(config.database, function(err){
	if(err){
		console.log('Error connecting database, please check if MongoDB is running.');
	}else{
		console.log('Connected to database...');
	}
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('body-parser').json({ type : '*/*' }));

// use morgan to log requests to the console
app.use(morgan('dev'));

// Enable CORS from client-side
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// basic routes

app.get('/', function(req, res) {
	res.send('voiture Watch API is running at http://localhost:' + port + '/api');
});

app.post('/register', user.signup);

// express router
var apiRoutes = express.Router();

app.use('/api', apiRoutes);

apiRoutes.post('/login', user.login);

apiRoutes.use(user.authenticate); // route middleware to authenticate and check token

// authenticated routes
apiRoutes.get('/', function(req, res) {
	res.status(201).json({ message: 'Welcome to the authenticated routes!' });
});

apiRoutes.get('/user/:id', user.getuserDetails); // API returns user details

apiRoutes.put('/user/:id', user.updateUser); // API updates user details

apiRoutes.delete('/user/:id', user.delUser); //API removes the user details of given user id

apiRoutes.put('/password/:id', user.updatePassword); // API updates user password

apiRoutes.post('/voiture/:id', voiture.savevoiture); // API adds & update voiture of the user

apiRoutes.delete('/voiture/:id', voiture.delvoiture); //API removes the voiture details of given voiture id

apiRoutes.get('/voiture/:id', voiture.getvoiture); // API returns voiture details of given voiture id

 // API returns voiture details of given voiture id

apiRoutes.post('/voiture/report/:id', voiture.voiturereport); //API returns voiture report based on user input


// kick off the servergetvoitures
app.listen(port);
console.log('voiture Manager app is listening at http://localhost:' + port);
