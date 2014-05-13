var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Link = require('./link.js');

var User = db.Model.extend({
  tableName: 'users',

  links: function() {
    return this.hasMany(Link);
  },

  initialize: function() {
    // set salt
    bcrypt.genSalt(10, function(error, salt) {
      this.set('salt', salt);

      // set hash
      bcrypt.hash(this.get('password'), salt, function(){}, function(error, hash){
        this.set('hash', hash);
      }.bind(this));

      // save user to the database
      this.save();

    }.bind(this));

    this.setPasswordHash(this.get('password'));
  }
});

module.exports = User;
