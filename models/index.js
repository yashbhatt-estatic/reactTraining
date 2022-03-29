const fs = require('fs');
const path = require('path');
const Mongoose = require('mongoose');
const basename = path.basename(__filename);

const db = () => {
    const m = {};

    fs
        .readdirSync(__dirname)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            const model = require(path.resolve(__dirname, file))(Mongoose);
            m[model.modelName] = model;
        });

    return m;
}


const models = db();
const mongoose = Mongoose;

module.exports = mongoose;
module.exports.default = models;
