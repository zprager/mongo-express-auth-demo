const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const users = require('./routes/user');
const admin = require('./routes/admin');
const favicon = require('serve-favicon');
const async = require('async');

var app = express();

var cors = require("cors");
const corsOptions = {
  origin: "*",
};



// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');

//authdemo is the name of the db
mongoose.connect("mongodb://localhost/authdemo")
  .then(() => { // if all is ok we will be here
    console.log('******************Start db working');
  })
  .catch(err => { // if error we will be here
      console.error('App starting error:', err.stack);
      process.exit(1);
  });

var User = require('./models/User');
  //run a chron every day to get the value of user's holdings
  //and then save it in the user model

  app.use(cors(corsOptions));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  //app.use('/images',express.static(path.join(__dirname, 'public/images')));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');


  app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

  app.use('/users', users);

  app.use(function(req, res, next) {
      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['mongoose'] || req.headers['x-access-token'];
      // decode token
      console.log("token found in header\n");
      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.jwt.secret, function(err, decoded) {
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
          } else {
            // if everything is good, save to request for use in other routes
            console.log('user token good, user: '+JSON.stringify(decoded));
            req.decoded = decoded;
            next();
          }
        });

      } else {
        // if there is no token
        // return an error
        console.log('*******no token in request');
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

        // or redirect to login
        //res.redirect('/login');
      }
});

app.use('/protected', admin);

  //app.get('/', (req, res) => res.render('pages/postCoin'));
  app.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
  //app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
