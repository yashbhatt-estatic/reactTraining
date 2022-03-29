var userServices = require('../services/user.services');
var nodeMail = require('../helper/helperFun');

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

const getUserById = async(req, res) => {
    try {
        const result = await userServices.getUserById(req);
        if (result) {
            return res.status(200).json({
                success: true,
                error: false,
                data: result,
                msg: result === null ? "User data fetched successfully." : "User not found."
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
        nodeMail.contact(result.email);
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: result === null ? "Data Registered successfully." : "User already exists."
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

const updateUser = async(req, res) => {
    try {
        const result = await userServices.updateUser(req);
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: result === null ? "User Updated successfully." : "User not found."
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

const deleteUser = async(req, res) => {
    try {
        const result = await userServices.deleteUser(req.params.id);
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: result === null ? "User Deleted successfully." : "User not found."
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

// Soft Delete
// const softDelete = async(req, res) => {
//     try {
//         const result = await userServices.softDelete(req.params.id);
//         return res.status(200).json({
//             success: true,
//             error: false,
//             data: result,
//             msg: "User Deleted successfully."
//         });
//     } catch (err) {
//         return res.status(500).json({
//             success: false,
//             error: true,
//             data: err,
//             msg: "Error while deleting user."
//         });
//     }
// }


module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};