var userAuthController = require('../controllers/user.auth.controller');

const createUser = async(req) => {
    var user = req.body;
    const hashPass = userAuthController.hashPassword(user.password);
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
            resolve(result);
        }).catch((err) => {
            console.log(err);
            reject(err);
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

const loginUser = async function(email) {
    return await new Promise((resolve, reject) => {
        models.users.findOne({
            attributes: ['first_name', 'last_name', 'email', 'username', 'password', 'phone_number', 'company'],
            where: { email }
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
            return resolve(result);
        }).catch((err) => {
            return reject(err);
        })
    })
}

const softDelete = async(id) => {
    return new Promise((resolve, reject) => {
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

const deleteUser = async(id) => {
    return new Promise((resolve, reject) => {
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