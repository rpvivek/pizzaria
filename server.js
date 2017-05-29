var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

//mongodb://localhost:27017
mongoose.connect('mongodb://rgp:prgajanan@ds129281.mlab.com:29281/rgvp', function(err){
	if(err)
	{
		console.log('Failed to connect to Database : '+ err);
	
	}
	else
	{
		console.log('Connected Successfully to MongoDB');
	}
	
});

app.get('*', function(req, res){
	
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port,function(){
	
	console.log("Running The Server" + port);
	
});