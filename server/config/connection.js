const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/appointment-creator',{}
);

module.exports = mongoose.connection;