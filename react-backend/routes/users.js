const express = require('express');
const router = express.Router();
var models = require('../database/models');
var Users = models.user;

/* GET ALL USERS */
router.get('/', (req, res, next) => {

    return Users.findAll().then(users => {
        if (!users) {
            return res.status(404).send({message: 'No users found'});
        }
        return res.status(200).send(users);
    })
    .catch(error => {
        res.status(400).send(error)
    });
});

/* GET USER BY ID */
router.get('/:user_id', (req, res, next) => {

    return Users.findById(req.params.user_id).then(user => {
        if (!user) {
            return res.status(404).send({message: 'User Not Found'});
        }
        return res.status(200).send(user);
        })
        .catch(error => {res.status(400).send(error)
        });
});

/* ADD USER */
router.post('/', (req, res, next) => {

    var newUser = new Users(req.body);
    newUser.save(req.body).then(respons => {
        res.send("user saved to database");
    })
    .catch(err => {
        res.status(400).send("unable to save user");
    });
});

/* DELETE USER */
router.delete('/:user_id', (req, res, next) => {
    Users.destroy({
        where: {
            user_id: req.params.user_id,
        }
    }).then(respons => {
        res.send("User deleted");
    })
    .catch(err => {
        res.status(400).send("Unable to delete users");
    });
});

/* UPDATE USER */
router.put('/', (req, res, next) => {

    Users.update(req.body,{
        where:{
            user_id: req.body.user_id,
        }
    }).then(respons => {
        res.send("User updated!");
    })
    .catch(err => {
        res.status(400).send("unable to updates user's settings!");
    });
});

module.exports = router;