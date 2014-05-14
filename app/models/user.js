var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Link = require('./link.js');

var User = db.Model.extend({
  tableName: 'users',

  links: function() {
    return this.hasMany(Link);
  },

    // var user = new User({username: username, password: password});
    // console.log(user);

    // res.redirect('/');  // redirect to links page


  saveUser: function() {
    // set salt
    bcrypt.genSalt(10, function(error, salt) {
      // set hash
      bcrypt.hash(this.get('hash'), salt, function(){}, function(error, hash){
        this.set('hash', hash);
      }.bind(this));

      // save user to the database
      this.save();

    }.bind(this));
  }
});

module.exports = User;
