// Define a plan for a collection

const mongoose = require('mongoose');

// Schema for a collection of voters
const Voter = new mongoose.Schema({
  first: String,
  last: String,
  zip: String,
  history: String
});

// Speed up queries on all fields
voter.index({first: 1});
voter.index({last: 1});
voter.index({zip: 1});
voter.index({history: 1});

// Compile and export this schema
module.exports = mongoose.model('Voter', voter);
