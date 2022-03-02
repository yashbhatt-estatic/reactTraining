const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const saltRounds = 10;

function hashPassword(password) {
    try {
        let hash = bcrypt.hashSync(password, saltRounds);
        return (hash);
    } catch (err) {
        return (err);
    }
}

function checkPassword(password, userPassword) {
    try {
        let flag = bcrypt.compareSync(password, userPassword);
        return (flag);
    } catch (err) {
        return (err);
    }
}

function tokenization(username, password) {
    try {
        var token = jwt.sign({ username, password }, 'secret');
        return (token);
    } catch (err) {
        return (err);
    }
}

module.exports = {
    checkPassword,
    tokenization,
    hashPassword
}