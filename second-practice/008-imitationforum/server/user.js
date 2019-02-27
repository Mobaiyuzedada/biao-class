const express = require('express');
const router = express.Router();
const user = require('../models/user');


router.put('/createUser', (req, res) => {
    user.create(req.body)
        .then(user => res.send({ status: 'ok', id: user._id }))
        .catch(err => {
            let errmsg = err.errmsg;
            if (err.code === 11000) {
                return res.status(400).send({
                    status: 'error',
                    error: 'duplicate',
                    errdetail: errmsg,
                })
            }
        })
})
router.post('/findUser', (req, res) => {
    console.log(req.body);
    user.find(req.body).then(user => {
        res.send({ status: 'ok', user })
        console.log(user);
    }).catch(err => res.send(err))
})
router.post('/getUser/by-id/:id', (req, res) => {
    console.log(req.params.id);
    user.findById({ _id: req.params.id })
        .then(user => {
            console.log(user);
            res.send({ status: 'ok', user: { username: user.user_name, id: user._id } })
        }).catch(e => res.send(e))
})
module.exports = router;