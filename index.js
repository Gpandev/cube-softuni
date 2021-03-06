require('dotenv').config()
const env = process.env.NODE_ENV
const mongoose = require('mongoose');
const config = require('./config/config')[env]
const express = require('express');
const app = express();

mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) {
        console.error(err)
        throw err;
    }

    console.log('Database is setup and running');
})

require('./config/express')(app);
require('./routes/auth')(app);
require('./routes/cube')(app);
require('./routes/accessory')(app);
require('./routes')(app);


app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));