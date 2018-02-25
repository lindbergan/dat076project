const express = require('express');
const router = express.Router();

router.get('/:userid', function(req, res, next) {
  res.json({
    id: 1,
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

router.get('/:userid/total_price', function(req, res, next) {
  res.json({
    total_price: 100
  });
});

router.get('/:userid/total_amount', function(req, res, next) {
  res.json({
    total_amount: 3
  });
});

module.exports = router;
