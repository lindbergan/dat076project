'use strict';

/* Import dummyData to populate the tables */
var dummyUsers = require('../dummyData/dummyUsers');
var dummyProducts = require('../dummyData/dummyProducts');
var dummyReviews = require('../dummyData/dummyReviews');
var dummyCarts = require('../dummyData/dummyCarts');

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config, {operatorsAliases: false}
);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config, {'pool': false, operatorsAliases: false}
);
}

/* the models are ordered in the way we want to create them */
var models = [
    'user',
    'product',
    'review',
    'cart'
];

/* Drop tables manually in reverse order to consider the dependency of FKs [DEVELOPMENT]
  COURTESY: https://stackoverflow.com/questions/17822663/sequelize-drop-table-in-wrong-order */
models.reverse().forEach(function(model) {

    sequelize.import(__dirname + '/' + model).drop().then(function(){
        console.log("success model:" + model);

    }).error(function(error){
        console.log("model:" + model + " error:" + error);
    });
});

/* Import the tables to the db */
models.forEach(models => {
    var model = sequelize['import'](path.join(__dirname, models));
    db[model.name] = model;
});

/* Setup the associations between the tables */
models.forEach(modelName => {
    if (sequelize.models[modelName].associate) {
    sequelize.models[modelName].associate(db);
    }
});

/* Sync the tables in db */
sequelize.sync().then(function (err) {

    // populate the db with regards to FKs
    sequelize.models.user.bulkCreate(dummyUsers).then(task => {
      sequelize.models.product.bulkCreate(dummyProducts).then(task => {
        sequelize.models.review.bulkCreate(dummyReviews,{ignoreDuplicates: true}).then(task => {
          sequelize.models.cart.bulkCreate(dummyCarts,{ignoreDuplicates: true}).then(task => {
          });
        });
      });
    });
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
