// Store some data in the voter database

const mongoose = require('mongoose');
const connect = require('./db');
const voter = require('./schema');
const fs = require('fs');
const readline = require('readline');

connect();  // To the database

// Read majors.csv (which needs to be on your VM when you run this code).

const file = readline.createInterface({
  input: fs.createReadStream('voters.csv')
});

// Create an array of objects, so that each line of the file is represented by an object with three properties.
const rows = [];
file.on('line', function(line) {
  const column = line.split(',');
  rows.push(
    new voter({
      first: column[0],
      last: column[1],
      zip: column[2],
      history: column[3]
    }).save()
  );
});

// Let the popularity score for a discipline be the number of majors it has plus half the number of minors.
// Sort disciplines by (increasing) popularity.
file.on('close', function() {
  mongoose.connection.dropDatabase()
    .then(() => Promise.all(rows))
    .then(() => mongoose.connection.close())
    .then(() => console.log('Database is ready.'))
    .catch(error => console.error(error.stack));
});



// Condensed callbacks in a sequence (no nesting)
// Reset the data
