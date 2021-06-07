var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cookieSession = require('cookie-session')

/***************Mongodb configuratrion********************/
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://simplon974:simplon974@cluster0-2q4j1.azure.mongodb.net/simplonvote?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(
  cookieSession({
    name: 'simplonVote',
    keys: ['asq4b4PR'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
)

/**
 * @MidleWare
 * UTILISATEUR CONNECTÉ
 */
app.use('/*', function (req, res, next) {
  // console.log(req.session)
  res.locals.currentUser = {}
  if (req.session.user) {
    res.locals.currentUser.login = req.session.user.login // login de l'utilisateur connecté (dans le menu) accessible pour toutes les vues
    res.locals.currentUser.id = req.session.user._id
  }
  next()
})

/**
 * @MidleWare
 * Flash Messages
 */
app.use('/*', function (req, res, next) {
  res.locals.msgFlash = {}
  if (req.session.msgFlash) {
    res.locals.msgFlash = req.session.msgFlash
    req.session.msgFlash = null
  }
  next()
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
