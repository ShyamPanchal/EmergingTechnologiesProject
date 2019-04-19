// Load the module dependencies
const config = require('./config');
const mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function () {
    // Use Mongoose to connect to MongoDB
    //const db = mongoose.connect(config.db);
    const db = (mongoose.connect(config.db, {useNewUrlParser: true},(error) => {
        console.log(error);
    }));

    // Load the 'User' model 
    require('../app/models/user.server.model');
    
    require('../app/models/logs.server.model');
    require('../app/models/comments.server.model');
    require('../app/models/alerts.server.model');
    require('../app/models/videos.server.model');

    // Return the Mongoose connection instance
    return db;
};