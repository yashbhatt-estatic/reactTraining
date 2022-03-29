const User = require('../models/user')

const createUser = async(req) => {
    var user = req.body;
    return new Promise((resolve, reject) => {
        User.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            department: user.department,
            gender: user.gender,
            city: user.city,
            state: user.state,
            country: user.country,

        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    })
}

const getUser = async() => {
    return new Promise((resolve, reject) => {
        User.find({ is_delete: false }, { first_name: 1, last_name: 1, email: 1, department: 1, gender: 1, state: 1, country: 1 }).then((result) => {
            return resolve(result);
        }).catch((err) => {
            return reject(err);
        })

    })
}

const getUserById = async(req) => {
    return new Promise((resolve, reject) => {
        var id = req.params.id;
        User.find({ is_delete: false, _id: id }, { first_name: 1, last_name: 1, email: 1, department: 1, gender: 1, state: 1, country: 1 }).then((result) => {
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

const deleteUser = async(id) => {
    return new Promise((resolve, reject) => {
        User.findOneAndDelete({ _id: id }).then((result) => {
            resolve({ result });
        }).catch((err) => {
            reject(err);
        })
    })
}

//Soft-Delete 

// const softDelete = async(id) => {
//     return new Promise((resolve, reject) => {
//         User.findOneAndUpdate({ _id: id }, { is_delete: true }).then((result) => {
//             resolve(result);
//         }).catch((err) => {
//             reject(err);
//         })
//     })
// }

module.exports = {
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser
}