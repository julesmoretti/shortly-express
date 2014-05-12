var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'password',
    database: 'shortlydb',
    charset: 'utf8',
    filename: path.join(__dirname, '../db/shortly.sqlite')
  }
});

db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.string('url', 255);
      link.string('base_url', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('clicks').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('clicks', function (click) {
      click.increments('id').primary();
      click.integer('link_id');
      click.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

/************************************************************/
// Add additional schema definitions below
/************************************************************/

db.knex.schema.createTable('Users', function(table) {
  table.increments('id');
  table.string('username');
  table.string('salt');
  table.string('hash'); // salted hash
});

db.knex.schema.createTable('Sessions', function(table){
  table.increments('id');
  table.dateTime('loggedInAt');
  table.dateTime('lastRequestAt');
  // table.string('username');
  table.integer('uid')
    .references('id')
    .inTable('Users');
});

// db.knex.schema.createTable('Lists', function(table){
//   table.increments('id');
//   table.varchar('uri');
//   table.v
// });
// var Users = Bookshelf.Model.extend({
//   tableName: 'users'
// });

// var customer = new User;

// customer.set({first_name: "Joe", last_name: "Customer"});

// return bookshelf.Knex.Schema.createTable("Sessions", function(table) {
//   table.increments("id");
//   table.dateTime("loggedInAt");
//   table.dateTime("lastRequestAt");
//   table.integer('userId')
//     .unsigned()
//     .references('id')
//     .inTable('Users')
//     .onDelete('CASCADE')  // optional
//     .onUpdate(...) // optional
// });

module.exports = db;
