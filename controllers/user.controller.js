var userServices = require('../services/user.services');
var userAuthController = require('./user.auth.controller');

const getUser = async(req, res) => {
    try {
        const result = await userServices.getUser();
        if (result) {
            return res.status(200).json({
                success: true,
                error: false,
                data: result,
                msg: "User data fetched successfully."
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: true,
            data: err,
            msg: "Error while getting user."
        });
    }
}

const createUser = async(req, res) => {
    try {
        const result = await userServices.createUser(req);
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: "Data Registered successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: true,
            data: err,
            msg: "Error while register user."
        });
    }

}

const loginUser = async(req, res) => {
    try {
        const user = await userServices.loginUser(req.body.email);
        const check = await userAuthController.checkPassword(req.body.password, user.password);
        if (check) {
            const token = await userAuthController.tokenization(user.username, user.password);
            return res.status(200).json({
                success: true,
                error: false,
                data: user,
                token: token,
                msg: "User logged in successfully."
            });
        } else {
            return res.status(500).json({
                success: false,
                error: true,
                msg: 'Invalid email or password'
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: true,
            data: err,
            msg: "Error while logging user."
        });
    }
}

const updateUser = async(req, res) => {
    try {
        const result = await userServices.updateUser(req);
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: "User Updated successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: true,
            data: err,
            msg: "Error while updating user."
        });
    }
}

const softDelete = async(req, res) => {
    try {
        const result = await userServices.softDelete(req.params.id);
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: "User Deleted successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: true,
            data: err,
            msg: "Error while deleting user."
        });
    }
}

const deleteUser = async(req, res) => {
    try {
        const result = await userServices.deleteUser(req.params.id);
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: "User Deleted successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: true,
            data: err,
            msg: "Error while deleting user."
        });
    }
}

module.exports = {
    getUser,
    createUser,
    loginUser,
    updateUser,
    softDelete,
    deleteUser
};