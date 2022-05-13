process.env.NODE_ENV !== 'production' ? require('dotenv').config() : null;

// import required modules
const express = require('express'),
	path = require('path'),
	cors = require('cors'),
	app = express(),
	mongoose = require('mongoose'),
	port = process.env.PORT || 3000;

// database connection
mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('Database connected');
	})
	.catch((err) => console.log(err));
