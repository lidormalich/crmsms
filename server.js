const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3900;

const bodyParser = require('body-parser')

// All Route
const routes = require('./routes/index')
const login = require('./routes/login')
const event = require('./routes/event')
const register = require('./routes/register')
const sendsms = require('./routes/sms')
const sentences = require('./routes/sentences')
const excel = require('./routes/excel')

process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

app.use(cors()) // Open To all
require('dotenv').config();
mongoose.set('strictQuery', false);

mongoose.Promise = global.Promise
mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(() => { console.log('conected to Data base') })
    .catch((err) => console.log(err))

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

// Define static options
const reactOptions = {
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("Cache-Control", "no-cache");
  },
  extensions: ["html", "htm"],
};

// Static files - Frontend React app
const buildPath = path.join(__dirname, "public/crmsms/build");
app.use(express.static(buildPath, reactOptions));

// API Routes
app.use('/api/login', login);
app.use('/api/register', register);
app.use('/api/event', event);
app.use('/api', routes);
app.use('/api/sendsms', sendsms);
app.use('/api/sentences', sentences);
app.use('/api/excel', excel);

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    console.log(req);
    next();
});

// Catch-all route for SPA (React) - must be after API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log('server conected on port: ' + port);
});