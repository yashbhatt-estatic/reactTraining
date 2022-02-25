const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const saltRounds = 10;

const createUser = async(req, res, next) => {
    var user = req.body;
    const hashPass = bcrypt.hashSync(user.password, saltRounds);
    console.log(hashPass);
    var profile_pic = req.files[0].path;
    return new Promise((resolve, reject) => {
        models.users.create({
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
            resolve({ result });
        }).catch((err) => {
            console.log(err);
            reject({ err });
        })
    })
}

const getUser = async() => {
    return new Promise((resolve, reject) => {
        models.users.findAll({
            attributes: ['first_name', 'last_name', 'email', 'username', 'password', 'phone_number', 'company'],
            where: { is_delete: 0 }
        }).then((result) => {
            return resolve(result);
        }).catch((err) => {
            return reject(err);
        })

    })
}

const loginUser = async function(req, res, next) {
    console.log(req.body);
    var user = req.body;
    return new Promise((resolve, reject) => {
        models.users.findOne({
            attributes: ['first_name', 'last_name', 'email', 'username', 'password', 'phone_number', 'company'],
            where: { email: req.body.email }
        }).then((result) => {
            console.log(result);
            let flag = bcrypt.compareSync(user.password, result.password);

            if (flag) {
                var token = jwt.sign({ username: user.username }, 'secret');
                return resolve({ result, token });

            } else {
                return resolve({
                    result
                })
            }
        }).catch((err) => {
            return reject({ err });
        })
    })
}

const updateUser = async(req, res, next) => {
    return new Promise((resolve, reject) => {
        var id = req.params.id;
        var user = req.body;
        profile_pic = req.files[0].path;
        models.users.update({
            first_name: user.first_name,
            last_name: user.last_name,
            profile_pic
        }, {
            where: {
                id
            }
        }).then((result) => {
            resolve({ result });
        }).catch((err) => {
            reject({ err });
        })
    })
}

const softDelete = async(req, res, next) => {
    return new Promise((resolve, reject) => {
        var id = req.params.id;
        models.users.update({
            is_delete: 1
        }, {
            where: {
                id
            }
        }).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        })
    })
}

const deleteUser = async(req, res, next) => {
    return new Promise((resolve, reject) => {
        var id = req.params.id;
        models.users.destroy({
            where: {
                id
            }
        }).then((result) => {
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