const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

async function main() {
    // create express app
    const app = express();

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // parse application/json
    app.use(bodyParser.json());

    // Configuring the database
    try {
        await mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error('Could not connect to the database. Exiting now...', error);
        process.exit(1);
    }

    // define a simple route
    app.get('/', (req, res) => {
        res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
    });

    require('./app/routes/note.routes.js')(app);
    require('./app/routes/location.routes.js')(app);

    // listen for requests
    app.listen(3000, () => {
        console.log("Server is listening on port 3000");
    });
}

main().catch(err => console.error(err));
