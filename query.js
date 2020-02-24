const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

/*// What documents are in the collection?
const query = Professor.find();
query.exec(function(error, professors) {
  if (error) console.error(error.stack);
  console.log(professors);
});*/

const queries = [

  // How many registered voters live in the Canton zip code (13617)?
  Voter.find().where('zip').equals('13617').count(),

  // What are the full names of all the registered voters whose first-name is STARR?
  Voter.find().where('first').equals('STARR'),

  // How many people voted in the 2016 general election (GE16)?
  Voter.find({ "history": /GE16/i }).count(),

  // What is the last-name that comes last in the county in alphabetical order?
  Voter.find().sort('-last').limit(1),

  // How many zip codes does the county contain?
  Voter.distinct('zip')

];

Promise.all(queries)
  .then(function(results) {
    console.log('Number of registered voters in Canton: ', results[0]);
    console.log('Voters with name the first name STARR: ', results[1].map(v => (v.first + " " + v.last)));
    console.log('Number of 2016 general election Voters: ', results[2]);
    console.log('The last-name that comes last in the county in alphabetical order:', results[3].map(v => v.last));
    console.log('Number of Distinct zip codes: ', results[4].length);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
