
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
app.configure('development', function(){
  app.set('port', process.env.PORT || 8090);
  app.use(express.errorHandler());
  app.locals({
    env: 'development',
  });
});

// production only
app.configure('production', function(){
  app.set('port', process.env.PORT || 8090);
  app.locals({
    env: 'production',
  });
});

// redirect from www
app.get('/*', function(req, res, next) {
  if (req.headers.host.match(/^www/) !== null ) {
    var new_url = 'http://' + req.headers.host.replace(/^www\./, '') + req.url
    res.redirect(301, new_url);
  }
  else next();
});


app.get('/', routes.index);
app.get('/contact', routes.contact);

app.post('/contact', function(req, res, next) {
  var html  = '<p>name: '+req.body.name+'</p>'+
              '<p>email: '+req.body.email+'</p>'+
              '<p>message: '+req.body.message+'</p>'
  email(
    {
      subject: 'Cavendish Contact Page',
      html: html
    })
    res.send(req.body)
})


function email(opts) {
  if (app.settings.env === 'development' || app.settings.env === 'staging' )
    return console.log(opts.html)

  var message = {
    from: 'Website Contact Page <contact@rosito-bisani.com>',
    // Comma separated list of recipients
    to: 'bobby.chambers33@gmail.com',
  }
  message.subject = opts.subject
  message.html = opts.html

  smtpTransport.sendMail(message, function(error, response){
    if(error)
      console.log(error);
    else
      console.log('Email sent: ' + response.message);
    smtpTransport.close(); // shut down the connection pool, no more messages
  })
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
