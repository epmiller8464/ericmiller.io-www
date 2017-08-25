'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var hbs = require('express-handlebars');
var fs = require('fs');
var compression = require('compression');
var sslRedirect = require('./lib/ssl-redirect');
var app = express();
// app.use(sslRedirect(['test', 'production']))
app.disable('x-powered-by');
app.use(compression());

// view engine setup
var exphbs = hbs.create({
  extname: 'hbs', defaultLayout: 'layout', helpers: {
    section: function section(name, options) {
      if (!this._sections) {
        this._sections = {};
      }
      this._sections[name] = options.fn(this);
      return null;
    },
    increment: function increment(index) {
      return index + 1;
    },
    formatDate: function formatDate(date) {
      return moment(date).format('L');
    },
    formatDateTime: function formatDateTime(date) {
      return moment(date).format('LLL');
    },
    printCode: function printCode(code) {
      return JSON.stringify(code, null, 2);
    },
    ifCond: function ifCond(v1, operator, v2, options) {

      switch (operator) {
        case '==':
          return v1 == v2 ? options.fn(this) : options.inverse(this);
        case '===':
          return v1 === v2 ? options.fn(this) : options.inverse(this);
        case '<':
          return v1 < v2 ? options.fn(this) : options.inverse(this);
        case '<=':
          return v1 <= v2 ? options.fn(this) : options.inverse(this);
        case '>':
          return v1 > v2 ? options.fn(this) : options.inverse(this);
        case '>=':
          return v1 >= v2 ? options.fn(this) : options.inverse(this);
        case '&&':
          return v1 && v2 ? options.fn(this) : options.inverse(this);
        case '||':
          return v1 || v2 ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    },
    printYesOrNo: function printYesOrNo(isTrue) {
      return isTrue ? 'Yes' : 'No';
    }
  }
});
// view engine setup
app.engine('hbs', exphbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('trust proxy', 1);
app.use(require('cors')({
  origin: '*',
  methods: 'GET,PUT,POST,OPTIONS,DELETE',
  preflightContinue: true
  // headers: ['Access-Control-Allow-Origin']
}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', require('./routes/index'));

app.use('/voice-mail', require('./routes/voice-mail'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
//# sourceMappingURL=app.js.map