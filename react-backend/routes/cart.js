const express = require('express');
const router = express.Router();

router.get('/:userid', function(req, res, next) {
  res.json({
    id: 1,
    total_price: 100,
    items_id: [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }]
  });
});

router.get('/:userid/total_price', function(req, res, next) {
  res.json({
    total_price: 100
  });
});

module.exports = router;
