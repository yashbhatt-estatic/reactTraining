const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://localhost/training', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to db');
}).catch((err) => {
    console.log('Error while connecting to database', err);
})
module.exports = connection;
