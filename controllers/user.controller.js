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
    // try {
    //     // const user = getUserByEmail(req.body.email)
    //     // const check = checkPassword(req.body.password, user.password)
    //     if (check) {
    //         const token = tokenization(user.username)
    //     }
    //     return res.status(500).send('Invalid email or password')

    // } catch(err) {

    // }
    const { err, result, token, msg } = await userServices.loginUser(req);
    console.log(result);
    if (token) {

        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            token: token,
            msg: "User logged in successfully."
        });
    }
    return res.status(500).json({
        success: false,
        error: true,
        msg
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