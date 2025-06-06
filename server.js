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

app.use(cors()) //Open To all
require('dotenv').config();
mongoose.set('strictQuery', false);

mongoose.Promise = global.Promise
mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(() => { console.log('conected to Data base') })
    .catch((err) => console.log(err))
app.use(bodyParser.json())

// Use all Route
app.use('/api/login', login);
app.use('/api/register', register);
app.use('/api/event', event);
app.use('/api', routes);
app.use('/api/sendsms', sendsms);
app.use('/api/sentences', sentences);
app.use('/api/excel', excel);

app.use((err, req, res, next) => {
    console.log(err);
    console.log(req);
    next();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.listen(port, () => {
    console.log('server conected on port: ' + port);
})

// static page
// Root
const reactOptions = {
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("Cache-Control", "no-cache");
  },
  extensions: ["html", "htm"],
};
const root = require("path").join(__dirname, "public");
// שרת את קבצי הריאקט הסטטיים
app.use(
  "/",
  express.static(
    require("path").join(__dirname, "public/crmsms/build"),
    reactOptions
  )
);
// שרת את קבצי הריאקט הסטטיים
app.use(
  "/",
  express.static(
    require("path").join(__dirname, "public/crmsms/build"),
    reactOptions
  )
);
// נתיב ה-catch-all עבור SPA
app.get('*', (req, res) => {
  // אם זה API, המשך
  if (req.path.startsWith('/api')) {
    return next();
  }
  
  // אחרת, החזר את index.html
  res.sendFile(path.join(__dirname, "public/crmsms/build/index.html"));
});
