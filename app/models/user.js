var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  initialize: function() {
    console.log(this.password);
    this.set({'salt': bcrypt.genSaltSync(10)});
    // this.salt = bcrypt.genSaltSync(10);
    // console.log(this.salt);
    // this.get('salt');
    // this.hash = bcrypt.hashSync(this.get('password'), this.get('salt'));
    // this.hash = bcrypt.hashSync(this.get('password'), this.salt);
    this.set({'hash': bcrypt.hashSync(this.get('password'), this.get('salt'))});
    // console.log(this.get.);
  },

  save: function() {

  }

});

module.exports = User;
