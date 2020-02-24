const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');
const fs = require('fs');
const readline = require('readline');
const file = readline.createInterface({
  input: fs.createReadStream('voters.csv')
});

connect();

// Empty array of voter data
voter_data = []

// Read the csv and put information into array
file.on('line', function(line) {
    const columns = line.split(',');
    voter_data.push(new Voter({
        first_name: columns[0],
        last_name: columns[1],
        zipcode: columns[2],
        history: columns[3]
        })
    );
});

// Close the file and save the voters to the database
file.on('close', function() {
    mongoose.connection.dropDatabase()
        .then(() => Promise.all(voter_data.map(voter => voter.save())))
        .then(() => mongoose.connection.close())
        .then(() => console.log('Database is ready.'))
        .catch(error => console.error(error.stack));
});
