// importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

const sprintreview = require('./routes/sprintreview');
const user = require('./routes/user');

// set up app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/stakeholdersignupportal');
mongoose.connection.on('connected', ()=>{
    console.log('Connect to database mongodb @ 27017');
});
mongoose.connection.on('error', (err)=>{
    if (err) {
        console.log('Error in database connection: ' + err);
    }
    console.log('Connect to database mongodb @ 27017');
});




// add middleware
app.use(cors());
app.use(bodyparser.json());
app.use('/public', express.static(path.join(__dirname, 'static')));

// add routes
app.use('/api/sprintreview', sprintreview);
app.use('/api/user', user);


const portNum = 3000;
app.listen(portNum,()=>{
    console.log('Server started at port: ' + portNum);
});