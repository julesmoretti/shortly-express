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
      link.integer('user_id')
        .references('id')
        .inTable('users');
      link.string('url', 255);
      link.string('base_url', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits')
        .references('id')
        .inTable('clicks');
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
      click.integer('link_id')
        .references('id')
        .inTable('urls');
      click.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

/************************************************************/
// Add additional schema definitions below
/************************************************************/
db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.integer('session_id')
        .references('id')
        .inTable('sessions');
      table.string('username');
      table.string('salt');
      table.string('hash'); // salted hash
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('sessions').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sessions', function(table){
      table.increments('id').primary();
      table.integer('user_id')
        .references('id')
        .inTable('users');
      table.dateTime('signin_at');
      table.dateTime('requested_at');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

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
