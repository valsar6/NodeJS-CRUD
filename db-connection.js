const connectDB = async () => {
    try {
        var mongoose = require('mongoose');
        var dbConfig = require('./config/database.config.js');

        mongoose.connection.on('error', function(e) {
            console.log('Could not connect to the database. Exiting now...');
            console.log(e)
            process.exit();
        });
        
        mongoose.connection.once('open', function() {
            console.log("Successfully connected to the database");
        })
      await mongoose.connect('mongodb://localhost:27017/mydatabase', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected...');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;