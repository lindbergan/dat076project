const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
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

router.get('/:product_id', function(req, res, next) {
  res.json({
    id: 1,
    name: "Product 1",
    price: 100
  });
});

module.exports = router;
