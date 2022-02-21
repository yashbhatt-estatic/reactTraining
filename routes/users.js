var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { request } = require('express');
const saltRounds = 10;

/* GET users listing. */
router.get('/', function(req, res, next) {
    con.query("Select first_name, last_name, email, username, password, phone_number, company from users where is_delete = (?)", [0], function(err, result) {
        if (err) {
            return res.status(500).json({
                success: false,
                error: true,
                data: [],
                msg: "User not available"
            });
        }
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: "User data fetched successful"
        });
    });
});

router.post('/create', function(req, res, next) {
    var user = req.body;
    con.query("Insert into users (first_name, last_name, email, username, password, phone_number, company) values ( ? , ? , ? , ? , ? ,? , ?)", [user.first_name, user.last_name, user.email, user.username, user.password, user.phone_number, user.company], function(err, result) {
        if (err) {
            return res.status(500).json({
                success: false,
                error: true,
                data: [],
                msg: "Error occur in server."
            });
        }
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: "Data added successfully"
        });
    });

});

router.put('/update/:id', function(req, res, next) {
    var id = req.params.id;
    var user = req.body;
    con.query("Update users set first_name = ?, last_name = ? where  id = ?", [user.first_name, user.last_name, id], function(err, result) {
        if (err) {
            return res.status(500).json({
                success: false,
                error: true,
                data: [],
                msg: "Data Updation fail."
            });
        }
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: "Data updated successfully"
        });
    });
});

router.put('/soft/:id', function(req, res, next) {
    var id = req.params.id;
    con.query("Update users set is_delete = ? where id = ?", [1, id], function(err, result) {
        if (err) {
            return res.status(500).json({
                success: false,
                error: true,
                data: [],
                msg: "Data Does not exist."
            });
        }
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: "Data soft deleted successfully"
        });
    })
});

router.delete('/delete/:id', function(req, res, next) {
    var id = req.params.id;
    con.query("Delete from users where id = ?", [id], function(err, result) {
        if (err) {
            return res.status(500).json({
                success: false,
                error: true,
                data: [],
                msg: "Data Does not exist."
            });
        }
        return res.status(200).json({
            success: true,
            error: false,
            data: result,
            msg: "Data deleted successfully"
        });
    })
});

router.post('/register', function(req, res, next) {
    var user = req.body;
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        con.query("Insert into users (first_name, last_name, email, username, password, phone_number, company) values ( ? , ? , ? , ? , ? ,? , ?)", [user.first_name, user.last_name, user.email, user.username, hash, user.phone_number, user.company], function(err, result) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: true,
                    data: [],
                    msg: "Some problem in Data Registration."
                });
            }
            return res.status(200).json({
                success: true,
                error: false,
                data: result,
                msg: "Data registered successfully"
            });
        });
    });

});

router.post('/login', function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    con.query("Select username,email,password from users where username = ? OR email = ?", [username, email], function(err, result) {
        if (err) {
            return res.status(500).json({
                success: false,
                error: true,
                data: [],
                msg: "Data not exist."
            });
        }
        bcrypt.compare(password, result[0].password, function(err, response) {
            if (response) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    msg: "User Logged In."
                });
            } else {
                return res.status(200).json({
                    success: true,
                    error: false,
                    msg: "Password is incorrect."
                });
            }
        });
    });
});

module.exports = router;