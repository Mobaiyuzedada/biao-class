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
    user.findOne(req.body).then(user => {
        if (user)
            res.send({
                status: 'ok', user: {
                    username: user.user_name,
                    id: user._id,
                    name: user.name ? user.name : null,
                    info: user.info ? user.info : null,
                    gender: user.gender ? user.gender : null,
                    admin: user.admin ? user.admin : false,
                }
            })
        else
            return Promise.reject("not found")
    }).catch(err => res.status(404).send(err))
})
router.post('/getUser/by-id/:id', async (req, res) => {
    let ruser;
    try {
        ruser = await user.findById({ _id: req.params.id });
    } catch (e) {
        console.log(e);
        res.status(500).send({ status: 'error' })
    }
    return res.send({
        status: 'ok', user: {
            username: ruser.user_name,
            id: ruser._id,
            github_id: ruser.github_id ? ruser.github_id : null,
            name: ruser.name ? ruser.name : null,
            info: ruser.info ? ruser.info : null,
            gender: ruser.gender ? ruser.gender : null,
        }
    })
    // user.findById({ _id: req.params.id })
    //     .then(user => {
    //         console.log(user);
    //         res.send({
    //             status: 'ok', user: {
    //                 username: user.user_name,
    //                 id: user._id,
    //                 github_id: user.github_id ? user.github_id : null,
    //                 name: user.name ? user.name : null,
    //                 info: user.info ? user.info : null,
    //                 gender: user.gender ? user.gender : null,
    //             }
    //         })
    //     }).catch(e => res.send(e))
})
router.post('/updateUser/by-id/:id', (req, res) => {
    user.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).then(newUser => {
        res.send({ status: 'ok' })
    }).catch(err => {
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
router.delete('/deleteUser/by-id/:id', (req, res) => {
    user.findOneAndRemove({ _id: req.params.id })
        .then(post => {
            res.send({ status: 'ok', delete_post: post })
        }).catch(err => res.send(err))
})

router.post('/fetchAllUser', (req, res) => {
    user.find(req.body).sort({ "createTime": 'desc' })
        .then(users => {
            users.forEach(el => el.password = null);
            res.send({ status: 'ok', users })
        }).catch(err => res.send(err))
})
module.exports = router;