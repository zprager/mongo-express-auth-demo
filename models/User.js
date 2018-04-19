var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require( 'bcrypt-nodejs' );

var userSchema = new Schema({
		firstName	: String,
		lastName	: String,
		password	: String,
    salt: String,
		email:   String,
		phoneNumber : String,
		deposits:[{bitcoin: Number, date: Date}],
		withdrawls:[{bitcoin: Number, date: Date}],
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// Execute before each user.save() call
userSchema.pre( 'save', function ( callback ) {
  var user = this;
  
  // if created_at doesn't exist, add to that field
  if (!user.created_at)
    user.created_at = currentDate;

  // Break out if the password hasn't changed
  if ( !user.isModified( 'password' ) ) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt( 5, function ( err, salt ) {
    if ( err ) return callback( err );

    bcrypt.hash( user.password, salt, null, function ( err, hash ) {
      if ( err ) return callback( err );
      user.salt = salt;
      user.password = hash;
      callback();
    } );
  } );
} );




// create the model for users and expose it to our app
module.exports = mongoose.model('users', userSchema);
