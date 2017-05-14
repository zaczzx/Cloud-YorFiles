const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const path = require('path');
const methodOverride = require('method-override');

const User = require('./models/user');
const config = require('./config');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const documentRoutes = require('./routes/documents');

mongoose.connect(config.getDbConnectionString());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

app.use(require('express-session')({
  secret: 'Most secret word phrase ever created',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(authRoutes);
app.use('/upload', uploadRoutes);
app.use('/documents', documentRoutes);

app.get('/', function(req, res){
  res.render('index');
});

var server = app.listen(3001, function(){
  console.log('Server listening on port 3001');
});
