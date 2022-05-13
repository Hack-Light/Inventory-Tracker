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
	.connect(process.env.DB_URI)
	.then(() => {
		console.log('Database connected');
	})
	.catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// register required middlewares
app.enable('trust proxy');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
