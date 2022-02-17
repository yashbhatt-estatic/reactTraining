var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send("You called the user listing method.");
});

router.post('/add', function(req, res, next) {
    res.send("You called the user add method.");
});

router.put('/save', function(req, res, next) {
    res.send("You called the user edit method.");
});

router.delete('/delete', function(req, res, next) {
    res.send("You called the user delete method.");
});

router.get('/:id', function(req, res, next) {
    res.send("You called the user details method.");
});

module.exports = router;