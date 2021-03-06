var express = require('express');
var router = express.Router();

const studentQueries = require('../queries/studentQueries')
const authUtils = require('../utils/auth')


router.post('/login', function (req, res, next) {
    studentQueries.readByEmail(req.body.email)
        .then(student => {
            // If student does not exist, return error
            if (!student) {
                res.json({
                    error: 'student not found'
                })
                return
            }

            const passwordMatch = authUtils.comparePassword(req.body.password, student.password)
            // If student exists, check password
            if (passwordMatch) {
                const token = authUtils.createJWT(student)
                res.json({token});
            } else {
                res.json({ error: 'Incorrect password' })
            }
        })
});

router.post('/signup', function (req, res, next) {
    studentQueries.create(req.body)
        .then(studentQueries.readByEmail(req.body.email))
        .then(student => {
            console.log(student)
            const passwordMatch = authUtils.comparePassword(req.body.password, student.password)
            // If student exists, check password
            if (passwordMatch) {
                const token = authUtils.createJWT(student)
                res.json({ token });
            } else {
                res.json({ error: 'Incorrect password' })
            }
        })
    }
);

module.exports = router;
