const express = require('express');
const router = express.Router();

router.get('/:user_id', (req, res, next) => {
  res.json({
    total_price: 100,
    total_amount: 3,
    items_id: [{
      id: 1,
      amount: 1
    }, {
      id: 2,
      amount: 1
    }, {
      id: 3,
      amount: 1
    }]
  });
});

router.get('/:user_id/total_price', (req, res, next) => {
  res.json({
    /* Get total price */
  });
});

router.get('/:user_id/total_amount', (req, res, next) => {
  res.json({
    /* Get total amount */
  });
});

router.post('/:user_id/product', (req, res, next) => {
  /* Push all products to cart */
});


router.put('/:user_id/product/product_id', (req, res, next) => {
  /* Update existing product amount in cart */
});

router.delete('/:user_id/product/product_id', (req, res, next) => {
  /* Remove existing product from cart */
});

router.delete('/:user_id/product', (req, res, next) => {
  /* Clears the entire cart */
});

module.exports = router;
