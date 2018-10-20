//Socket.io variables
var express = require('express');
var createError = require('http-errors');
var path = require('path');
// json requires
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
// routes
var room = require('./routes/room');
var chat = require('./routes/chat');
//express.js exports
var app = express();
// MongoDB
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/bancodedados', { useNewUrlParser: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connectado'))
  .catch((err) => console.error(err));

// JSON id parser
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

//express.js routers
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/rooms', express.static(path.join(__dirname, 'dist')));
app.use('/api/room', room);
app.use('/api/chat', chat);

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
  res.send(err.status);
});

module.exports = app;
