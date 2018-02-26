const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/******************************************************************************/
var models  = require('../database/models');
//var express = require('express');
//var router  = express.Router();

router.get('/', function(req, res) {
  models.user.findAll({
    //include: [ models.shoppingCart ]
  }).then(function(users) {
    res.render('index', {
      title: 'Sequelize: Express Example',
      users: users
    });
  });
});

//module.exports = router;
/******************************************************************************/
module.exports = router;
