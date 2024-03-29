
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , dircheck = require('./routes/check_dir')
  , upload = require('./routes/upload')
  , file = require('./routes/file')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/dircheck', dircheck.list);
app.get('/file', file.send);
app.post('/upload', upload.save);



http.createServer(app).listen(30000, function(){
  console.log("Express server listening on port " + app.get('port'));
});
