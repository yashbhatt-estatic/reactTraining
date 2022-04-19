const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb+srv://yash_bhatt_2001:Yash2001@userdata.ze1z4.mongodb.net/userData?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to db');
}).catch((err) => {
    console.log('Error while connecting to database', err);
})
module.exports = connection;
