//The definition of a review in the db
//(text, USER_ID, PRODUCT_ID, rating)
var dummyReviews = require('../dummyData/dummyReviews');
const models = require('path');


'use strict';
module.exports = (sequelize, DataTypes) => {
  var review = sequelize.define('review', {

      product_id: {
          type:           DataTypes.INTEGER,
          references:     models.product,
          referencesKey:  "product_id",
          unique:         'compositeIndex'
      },
      user_id: {
          type:           DataTypes.STRING,
          references:     models.user,
          referencesKey:  "user_id",
          unique:         'compositeIndex'
      },
      rating:             DataTypes.INTEGER, //should ideally be limited to (between 1 - 5)
      comment:            DataTypes.TEXT

  }, {
    //here you can define certain table criteria, like disableing the time stamps
    timestamps:     false,
  });

        review.associate = function(models) {
            // associations can be defined here
            review.belongsTo(models.user, {
                foreignKeyConstraint: true,
                foreignKey: "user_id",
                onDelete: 'CASCADE'
            });
            review.belongsTo(models.product, {
                foreignKeyConstraint: true,
                foreignKey: "product_id",
                onDelete: 'CASCADE'
            });
        };

/************************************************************/
  review.sync({force: true}).then(function (err) { //Now forces re-creation of tables

    review.bulkCreate(dummyReviews, {validate: true, ignoreDuplicates: true}).then(task => {});

  });
  /************************************************************/
  return review;
};
