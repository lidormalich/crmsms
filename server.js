const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3900;
const bodyParser = require('body-parser');

// All Route
const routes = require('./routes/index');
const login = require('./routes/login');
const event = require('./routes/event');
const register = require('./routes/register');
const sendsms = require('./routes/sms');
const sentences = require('./routes/sentences');
const excel = require('./routes/excel');

process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

// Middleware setup
app.use(cors()); // Open To all
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ 
  extended: true, 
  limit: "50mb" 
}));

// Set up MongoDB
require('dotenv').config();
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(() => { console.log('connected to Data base') })
  .catch((err) => console.log(err));

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

// הדפסת מבנה התיקיות כדי לבדוק מה באמת קיים
const fs = require('fs');
console.log('Checking directories structure:');
if (fs.existsSync(path.join(__dirname, 'public'))) {
  console.log('- public directory exists');
  const publicContents = fs.readdirSync(path.join(__dirname, 'public'));
  console.log('- public contents:', publicContents);
  
  if (fs.existsSync(path.join(__dirname, 'public/crmsms'))) {
    console.log('- public/crmsms directory exists');
    const crmsmsContents = fs.readdirSync(path.join(__dirname, 'public/crmsms'));
    console.log('- public/crmsms contents:', crmsmsContents);
    
    if (fs.existsSync(path.join(__dirname, 'public/crmsms/build'))) {
      console.log('- public/crmsms/build directory exists');
      const buildContents = fs.readdirSync(path.join(__dirname, 'public/crmsms/build'));
      console.log('- public/crmsms/build contents:', buildContents);
    } else {
      console.log('- public/crmsms/build directory does not exist');
    }
  } else {
    console.log('- public/crmsms directory does not exist');
  }
} else {
  console.log('- public directory does not exist');
}

// Serve static assets
// יש להשתמש בנתיב שקיים בפועל, בהתחשב בתוצאות הבדיקה למעלה
app.use(express.static(path.join(__dirname, 'public')));

// Fallback route for SPA (Single Page Application)
app.get('*', (req, res) => {
  // למקרה שהתיקייה crmsms/build קיימת
  if (fs.existsSync(path.join(__dirname, 'public/crmsms/build/index.html'))) {
    res.sendFile(path.join(__dirname, 'public/crmsms/build/index.html'));
  }
  // למקרה שהתיקייה build קיימת ישירות תחת public
  else if (fs.existsSync(path.join(__dirname, 'public/build/index.html'))) {
    res.sendFile(path.join(__dirname, 'public/build/index.html'));
  }
  // למקרה שקובץ index.html קיים ישירות תחת public
  else if (fs.existsSync(path.join(__dirname, 'public/index.html'))) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  }
  // אם לא נמצא שום קובץ אינדקס
  else {
    res.status(404).send('Application files not found. Make sure to include the frontend build in the deployment.');
  }
});

// Start the server
app.listen(port, () => {
  console.log('server connected on port: ' + port);
});