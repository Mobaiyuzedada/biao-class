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
            res.send({
                status: 'ok', user: {
                    username: user.user_name,
                    id: user._id,
                    name: user.name ? user.name : null,
                    info: user.info ? user.info : null,
                    gender:user.gender?user.gender:null,
                }
            })
        }).catch(e => res.send(e))
})
router.post('/updateUser/by-id/:id', (req, res) => {
    user.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).then(newUser => {
        res.send({ status: 'ok' })
    }).catch(err => {
        res.send(err);
    })
})
module.exports = router;