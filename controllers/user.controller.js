var userServices = require('../services/user.services');

const getUser = async(req, res) => {
    const result = await userServices.getUser();
    if (result) {
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: "User data fetched successfully."
        });
    }
    return res.status(500).json({
        success: false,
        error: true,
        data: err,
        msg: "Error while getting user."
    });

}

const createUser = async(req, res) => {
    const { err, result } = await userServices.createUser(req);
    if (err) {
        return res.status(500).json({
            success: false,
            error: true,
            data: err,
            msg: "Error while register user."
        });
    }
    return res.status(200).json({
        success: true,
        error: false,
        data: result,
        msg: "Data Registered successfully."
    });
}

const loginUser = async(req, res) => {
    const { err, result, token } = await userServices.loginUser(req);
    if (err) {
        return res.status(500).json({
            success: false,
            error: true,
            msg: "Please check credential."
        });
    }
    return res.status(200).json({
        success: true,
        error: false,
        data: result,
        token: token,
        msg: "User logged in successfully."
    });

}

const updateUser = async(req, res) => {
    const { err, result } = await userServices.updateUser(req);
    if (err) {
        return res.status(500).json({
            success: false,
            error: true,
            data: err,
            msg: "Error while updating user."
        });
    }
    return res.status(200).json({
        success: true,
        error: false,
        data: result,
        msg: "User Updated successfully."
    });
}

const softDelete = async(req, res) => {
    const { err, result } = await userServices.softDelete(req);
    if (err) {
        return res.status(500).json({
            success: false,
            error: true,
            data: err,
            msg: "Error while deleting user."
        });
    }
    return res.status(200).json({
        success: true,
        error: false,
        data: result,
        msg: "User Deleted successfully."
    });

}

const deleteUser = async(req, res) => {
    const { err, result } = await userServices.deleteUser(req);
    if (err) {
        return res.status(500).json({
            success: false,
            error: true,
            data: err,
            msg: "Error while deleting user."
        });
    }
    return res.status(200).json({
        success: true,
        error: false,
        data: result,
        msg: "User Deleted successfully."
    });
}

module.exports = {
    getUser,
    createUser,
    loginUser,
    updateUser,
    softDelete,
    deleteUser
};