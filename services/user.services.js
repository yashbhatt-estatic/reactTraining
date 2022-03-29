var userAuthController = require('../controllers/user.auth.controller');
const User = require('../models/user')

const createUser = async(req) => {
    var user = req.body;
    const hashPass = userAuthController.hashPassword(user.password);
    var profile_pic = req.files[0].path;
    return new Promise((resolve, reject) => {
        User.create({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
            password: hashPass,
            profile_pic,
            phone_number: user.phone_number,
            company: user.company

        }).then((result) => {
            console.log(result);
            resolve(result);
        }).catch((err) => {
            console.log(err);
            reject(err);
        })
    })
}

const getUser = async() => {
    return new Promise((resolve, reject) => {
        User.find({ is_delete: false }, { first_name: 1, last_name: 1, email: 1, username: 1, company: 1 }).then((result) => {
            return resolve(result);
        }).catch((err) => {
            return reject(err);
        })

    })
}

const loginUser = async function(email) {
    return await new Promise((resolve, reject) => {
        User.findOne({ email }, { first_name: 1, last_name: 1, email: 1, username: 1, password: 1, company: 1 
        }).then((result) => {
            return resolve(result);
        }).catch((err) => {
            return reject(err);
        })
    })
}

const updateUser = async(req) => {
    return new Promise((resolve, reject) => {
        var id = req.params.id;
        var user = req.body;
        User.findOneAndUpdate({ _id: id }, user).then((result) => {
            return resolve(result);
        }).catch((err) => {
            return reject(err);
        })
    })
}

const softDelete = async(id) => {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id: id }, { is_delete: true }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    })
}

const deleteUser = async(id) => {
    return new Promise((resolve, reject) => {
        User.findOneAndDelete({ _id: id }).then((result) => {
            resolve({ result });
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports = {
    createUser,
    getUser,
    loginUser,
    updateUser,
    softDelete,
    deleteUser
}