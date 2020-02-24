const mongoose = require('mongoose');

// Schema for a collection of voters
const Voter = new mongoose.Schema({
  first_name: String,
  last_name: String,
  zipcode: Number,
  history: String
});

// Speed up queries on all fields
Voter.index({first_name: 1});
Voter.index({last_name: 1});
Voter.index({zipcode: 1});
Voter.index({history: 1});

// Compile and export this schema
module.exports = mongoose.model('Voter', Voter);
