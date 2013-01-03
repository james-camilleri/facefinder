var http    = require("http");
var async   = require('async');
var express = require('express');
var util    = require('util');

// Create an express webserver
var app = express();
app.use(express.logger());
app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: process.env.SESSION_SECRET || 'secret123' }));
app.use(require('faceplate').middleware({
        app_id: 581546131861642,
        secret: "9d39b7d873b6b6d3ed27d536d05ad47b",
        scope:  'user_likes,user_photos,user_photo_video_tags'
    }));

// Set default template engine to Handlebars.js using hbs package.
// Add html filetype as template for development.
app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);

// Launch server.
var port = process.env.PORT || 4444;
http.createServer(app).listen(port);

console.log("Running on " + port);

// Render the index page.
function render_index(req, res) {
  //req.facebook.app(function(app) {
    //req.facebook.me(function(user) {
      res.render('index.html', {
        layout:    false,
        testMessage: "Hello :D"
      });
    //});
  //});
}

// Search handler, returns JSON object containing results.
function search(req, res) {

  // Check if user is logged in to Facebook.
  if (req.facebook.token) {
    req
  } else {
    console.log("Not logged in.");
  }
}

// Handle default page requests.
app.get('/', render_index);
app.post('/', render_index);

// Exposed RESTful api.
app.get('/search', search);