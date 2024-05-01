const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const apiPath = '/api/';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/databaseUsser', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded());

// website
app.use(express.static('client'));

// routers
app.use(apiPath + 'users', require('./routes/users.route'));
// app.use
app.use(apiPath + 'upload', require('./routes/upload.route'));

app.listen(port, function () {
	const host = 'localhost';
	console.log('http://%s:%s is ready', host, port);
});
