var express = require('express');
var router = express.Router();
var bcrypt = require( 'bcrypt-nodejs' );
var config = require('../config.js');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
/* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('Unprotected Route');
  });

  //with valid login, return token
  router.post('/login', function(req, res)
  {
      console.log("body received", req.body);
      if (!req.body.email || !req.body.password) {
          // email address is absolutely necessary for user creation
          res.json({
              success: false,
              message: 'Email and password required.',
              data: {}
          });
          return;
      }
      console.log('attempting login. email: '+req.body.email);
      User.findOne({
               email: req.body.email
              },
              function(err, user) {
                  console.log('user found:  '+JSON.stringify(user));

                  if (err) {
                      res.status(204);
                      res.json({
                          success: false,
                          message: 'Error occured while checking if the user exists',
                          data: {
                              'error': err
                          }
                      });
                      return;
                  }
                  if(user)
                  {
                    bcrypt.compare( req.body.password, user.password, function ( err, isMatch ) {
                      if ( err )
                          {
                              console.log('error: '+err );
                              res.json({
                                   success: false,
                                   message: 'Error occured while checking if the user exists',
                                   data: {
                              'error': err
                                          }
                              });
                          return;
                          }

                          if(isMatch)
                              {
                                  let admin = false;
                                  var token = jwt.sign(
                                      {
                                      "id":user._id,
                                      "username":user.email
                                      }, config.jwt.secret, {
                                    expiresIn: 1440*1260*3600 // expires in 24 hours
                                  });
                                  res.json(
                                          {"token":token,
                                          "token_for":req.body.email
                                  });
                              }
                          else{
                              res.status(204);
                              res.json(
                                  {"message":"incorrect password"}
                                          );
                          }
                        });
                  }else
                  {
                      res.status(200);
                      console.log("***********user not found");
                      res.json({"message":"no email found"});
                      return;
                  }
              });//end find



  });//end login

router.post('/register', function(req, res) {
    console.log('req body: ',req.body);
    if (!req.body.email || !req.body.password)
      {
        // email address is absolutely necessary for user creation
        res.json({
            success: false,
            message: 'email and password required',
            data: {}
        });
        return;
      }
        // see if users exist with the given userName and/or emailAddress
        console.log('email sent ', req.body.email);
        User.find(
          {
                'email': req.body.email
          }
        , function(err, foundUsers) {
            if (err) {
                res.status(400);
                res.json({
                    success: false,
                    message: 'Error occured while checking if the user exists',
                    data: {
                        'error': err
                    }
                });
                return;
            }
            console.log('found*********** ',foundUsers);
            if (foundUsers && foundUsers.length > 0 ) {
                console.log('founder user: '+foundUsers);
                // if users are found, we cannot create the user
                // send an appropriate response back
                res.status(204);
                res.json({
                    success: false,
                    message: 'User with requested username and/or email already exists',
                    data: {}
                });
                return;
            } else {
                // create the user with specified data
                var user = new User();
                console.log('create user: ');
                user.firstName = req.body.firstName || 'none';
                user.lastName =  req.body.lastName || 'none';
                user.email =     req.body.email;
                user.password =  req.body.password
                user.number = req.body.phoneNumber || 5555555555;
                //user.gcmId = req.body.gcmId;
                //user.source = req.body.source;
                user.save(function(err) {
                    if (err) {
                        res.json({
                            success: false,
                            message: 'Error occured while saving the user',
                            data: {
                                'error': err
                            }
                        });
                        return;
                    }
                    var payload = {

                        'number': user.number,
                        'email': user.email
                    };
                    var token = jwt.sign(payload, config.jwt.secret, {
                        expiresIn: 14400*360
                    });
                    //if you want to use cookies
                    // res.cookie('accessToken', token, {
                    //     'maxAge': 86400000
                    // });
                    res.json({
                        success: true,
                        message: 'User added/created successfully',
                        data: {

                            'token': token
                        }
                    });
                    return;
                });
            }
        });
    });



  module.exports = router;
