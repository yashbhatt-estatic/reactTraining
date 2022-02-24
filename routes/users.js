var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var authentication = require('../middleware/authentication');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        const filename = Date.now();
        cb(null, filename + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });



/* GET users listing. */
router.get('/', authentication, async function(req, res, next) {
    try {
        const result = await getUserAll();
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: "User data fetched successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: true,
            data: err,
            msg: "Error while getting user."
        });
    }
});

async function getUserAll() {
    return new Promise((resolve, reject) => {
        con.query("Select first_name, last_name, email, username, password, phone_number, company from users where is_delete = (?)", [0], function(err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

router.post('/create', authentication, upload.any('upload_file'), async function(req, res, next) {

    try {
        var user = req.body;
        user.profile_pic = req.files[0].path;
        const result = await createUser(user);
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: "User added successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: true,
            data: err,
            msg: "Some error while creating user."
        });
    }

});

async function createUser(user) {
    return new Promise((resolve, reject) => {
        con.query("Insert into users (first_name, last_name, email, username, password, profile_pic, phone_number, company) values ( ? , ? , ? , ? , ? , ? ,? , ?)", [user.first_name, user.last_name, user.email, user.username, user.password, user.profile_pic, user.phone_number, user.company], function(err, result) {

            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

router.put('/update/:id', authentication, upload.any('upload_file'), async function(req, res, next) {

    try {
        var id = req.params.id;
        var user = req.body;
        profile_pic = req.files[0].path;
        const result = await updateUser(user, profile_pic, id);
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

});

async function updateUser(user, profile_pic, id) {
    return new Promise((resolve, reject) => {
        con.query("Update users set first_name = ?, last_name = ?, profile_pic = ? where  id = ?", [user.first_name, user.last_name, profile_pic, id], function(err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}


router.put('/soft/:id', authentication, async function(req, res, next) {
    try {
        var id = req.params.id;
        const result = await softDelete(id);
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

});

async function softDelete(id) {
    return new Promise((resolve, reject) => {
        con.query("Update users set is_delete = ? where id = ?", [1, id], function(err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

router.delete('/delete/:id', authentication, async function(req, res, next) {
    try {
        var id = req.params.id;
        const result = await hardDelete(id);
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: "Data Deleted successfully."
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: true,
            data: err,
            msg: "Some error while deleting user."
        });
    }
});

async function hardDelete(id) {
    return new Promise((resolve, reject) => {
        con.query("Delete from users where id = ?", [id], function(err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

router.post('/register', upload.any('upload_file'), async function(req, res, next) {

    try {
        var user = req.body;
        const hash = await hashPassword(user.password);
        user.password = hash;
        user.profile_pic = req.files[0].path;
        const result = await registerUser(user);
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
});

async function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(error, hash) {
            if (error) {
                return reject(error);
            }
            return resolve(hash);
        });
    });
}

async function registerUser(user) {
    return new Promise((resolve, reject) => {
        con.query("Insert into users (first_name, last_name, email, username, password, profile_pic, phone_number, company) values ( ? , ? , ? , ? , ? , ? ,? , ?)", [user.first_name, user.last_name, user.email, user.username, user.password, user.profile_pic, user.phone_number, user.company], function(err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

router.post('/login', async function(req, res, next) {
    var user = req.body;
    try {
        const login = await loginUser(user);
        const finalResult = await hashCompare(user.password, login[0].password);

        if (finalResult) {
            var token = jwt.sign({ username: user.username }, 'secret');
            console.log(token);

            return res.status(200).json({
                success: true,
                error: false,
                token,
                data: login,
                msg: "User logged in successfully."
            });
        } else {
            return res.status(200).json({
                success: true,
                error: false,
                msg: "Please check password."
            });
        }


    } catch (err) {
        let msg;
        user.username ? (msg = "invalid username") : (msg = "invalid email");
        return res.status(500).json({
            success: false,
            error: true,
            msg
        });
    }

});

async function loginUser(user) {
    return new Promise((resolve, reject) => {
        con.query("Select username,email,password from users where username = ? OR email = ?", [user.username, user.email], function(err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

async function hashCompare(fetchedPassword, password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(fetchedPassword, password, function(error, response) {
            if (error) {
                return reject(error);
            }
            return resolve(response);
        });
    });
}

module.exports = router;