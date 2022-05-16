process.env.NODE_ENV !== 'production' ? require('dotenv').config() : null;

// import required modules
const express = require('express'),
	path = require('path'),
	cors = require('cors'),
	methodOverride = require('method-override'),
	app = express(),
	mongoose = require('mongoose'),
	port = process.env.PORT || 3000;

// routes

const route = require('./routes/index');

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

// setup static folders
app.use('/img', express.static(path.join(__dirname, '/public/images')));

// register required middlewares
app.enable('trust proxy');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// tell my server to use this route
app.use(route);

// fallback route
app.use('*', (req, res) => {
	res.status(404).json({
		success: false,
		message: 'Page Not found',
	});
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
