const express = require('express');
const router = express.Router();
var Sequelize = require('sequelize');
var models = require('../database/models')
//var product2 = require('./database/models/product');
var db = require('../database/models/index'),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

//var product2 = db.product;
//var products2 = db.product;
//var products = db.products;

router.get('/', (req, res, next) => {
  const products = [];

  const amount = 101;
  for (let i = 1; i < amount; i++) {
    products.push(
      {
        id: i.toString(),
        name: ("Product " + i).toString(),
        price: (i * 10).toString()
      }
    )
  }
  res.json(products);
});

router.get('/:product_id', (req, res, next) => {

    return models.product
      .findById(req.params.product_id)
      .then(product => {
        if (!product) {
          return res.status(404).send({
            message: 'product Not Found',
          });
        }
        return res.status(200).send(product);
      })
      .catch(error => res.status(400).send(error));
});

router.get('/:product_id/review', (req, res, next) => {
  res.json({
    reviews: [{
      id: 1,
      title: "This product rocked!",
      rating: 3,
      author: "Adrian",
      comment: "Lorem ipsum dolor sit amet...."
    },
      {
        id: 2,
        title: "This product was not good",
        rating: 1,
        author: "Adrian",
        comment: "Lorem ipsum dolor sit amet...."
      }]
  });
});

router.get('/:product_id/review/:review_id', (req, res, next) => {
  res.json({
    id: 1,
    title: "This product rocked!",
    rating: 3,
    comment: "Lorem ipsum dolor sit amet...."
  });
});

module.exports = router;
