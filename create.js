// Store some data in the faculty database

const mongoose = require('mongoose');
const connect = require('./db');
const Professor = require('./schema');

connect();  // To the database

// Create some faculty
const harcourt = new Professor({
  name: 'Ed Harcourt',
  rank: 'Full',
  started: 2003,
  courses: [140, 220, 345, 362, 364]
});

const torrey = new Professor({
  name: 'Lisa Torrey',
  rank: 'Associate',
  started: 2009,
  courses: [140, 219, 332, 362, 374, 380]
});

const lee = new Professor({
  name: 'Choong-Soo Lee',
  rank: 'Associate',
  started: 2010,
  courses: [140, 219, 256, 321, 370]
});

/*
// Delete any previous database
mongoose.connection.dropDatabase(function() {

  // Save the new data
  harcourt.save(function(error) {
    if (error) console.error(error.stack);

    torrey.save(function(error) {
      if (error) console.error(error.stack);

      lee.save(function(error) {
        if (error) console.error(error.stack);

        // Disconnect
        mongoose.connection.close(function() {
          console.log('Database is ready.');
        });
      });
    });
  });
});
*/


/*
// New version of callbacks in a sequence (no nesting)
mongoose.connection.dropDatabase()
  .then(function() {
    return harcourt.save();
  })
  .then(function() {
    return torrye.save();
  })
  .then(function() {
    return lee.save();
  })
  .then(function() {
    console.log('Database is ready.');
    return mongoose.connection.close();
  })
  .catch(function(error) {
    console.error(error.stack);
  });
*/


// Condensed callbacks in a sequence (no nesting)
// Reset the data
mongoose.connection.dropDatabase()
  .then(() => harcourt.save())
  .then(() => torrey.save())
  .then(() => lee.save())
  .then(() => mongoose.connection.close())
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));
