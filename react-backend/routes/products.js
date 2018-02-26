const express = require('express');
const router = express.Router();

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
  res.json({
    id: 1,
    name: "Product 1",
    price: 100,
    no_of_reviews: 0,
    review_ids: [{
      id: 1
    },
      {
        id: 2
      }]
  });
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
