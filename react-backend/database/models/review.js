//The definition of a review in the db
//(text, USER_ID, PRODUCT_ID, rating)
var dummyReviews = require('../dummyData/dummyReviews');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var review = sequelize.define('review', {

    user_id: {
      type:         DataTypes.STRING,
      allowNull:    false,
      unique:       'compositeIndex'
    },
    product_id: {
      type:         DataTypes.INTEGER,
      allowNull:    false,
      unique:       'compositeIndex'
    },
    rating:         DataTypes.INTEGER, //should probably ideally be limited to (between 1 - 5)
    comment:        DataTypes.TEXT

  }, {
    //here you can define certain table criteria, like disableing the time stamps
    timestamps:     false,
  });
  review.associate = function(models) {
    // associations can be defined here
  };

/************************************************************/
  review.sync({force: true}).then(function (err) { //Now forces re-creation of tables

    review.bulkCreate(dummyReviews, {validate: true, ignoreDuplicates: true}).then(task => {});

  });
  /************************************************************/
  return review;
};
