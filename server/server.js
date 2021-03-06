require('./config/config');
require('./config/passportConfig');

// importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

// set up app
const app = express();

// connect to mongodb
const connectOptions = {useUnifiedTopology: true, useNewUrlParser: true}
mongoose.connect(process.env.MONGODB_URI, connectOptions, (err) => {
    if (!err) { 
        console.log('MongoDB connection succeeded.'); 
    } else { 
        console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); 
    }
});

// add middleware
app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(cors());
app.use(bodyparser.json());
app.use(passport.initialize());

// add routes
const user = require('./routes/user');
const sprintreview = require('./routes/sprintreview');

app.use('/api/user', user);
app.use('/api/sprintreview', sprintreview);



app.listen(process.env.PORT,()=>{
    console.log('Server started at port: ' + process.env.PORT);
});