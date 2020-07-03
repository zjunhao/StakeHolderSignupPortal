// importing modules
require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

// set up app
const app = express();

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { 
        console.log('MongoDB connection succeeded.'); 
    } else { 
        console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); 
    }
});

// add middleware
app.use(cors());
app.use(bodyparser.json());
app.use('/public', express.static(path.join(__dirname, 'static')));

// add routes
const user = require('./routes/user');
const sprintreview = require('./routes/sprintreview');

app.use('/api/user', user);
app.use('/api/sprintreview', sprintreview);



app.listen(process.env.PORT,()=>{
    console.log('Server started at port: ' + process.env.PORT);
});