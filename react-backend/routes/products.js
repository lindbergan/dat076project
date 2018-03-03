const express = require('express');
const router = express.Router();
var models = require('../database/models');
var Products = models.product;
var Reviews = models.review;

//GET ALL PRODUCS
router.get('/', (req, res, next) => {

    return Products.findAll().then(product => {
        if (!product) {
    return res.status(404).send({
        message: 'product Not Found',
    });
}
return res.status(200).send(product);
})
.catch(error => res.status(400).send(error));
});

//GET PRODUCT BY ID
router.get('/:product_id', (req, res, next) => {

    return Products.findById(req.params.product_id).then(product => {
        if (!product) {
    return res.status(404).send({
        message: 'product Not Found',
    });
}
return res.status(200).send(product);
})
.catch(error => res.status(400).send(error));
});

//GET ALL PRODUCTS SORTED_BY_PRICE (ASC)
router.get('/filters/price_asc', (req, res, next) => {

    return Products.findAll({
        order: [
            ['price', 'ASC']
        ]
    }).then(products => {
        if (!products) {
    return res.status(404).send({
        message: 'products Not Found',
    });
}
return res.status(200).send(products);
})
.catch(error => res.status(400).send(error));
});

//GET ALL PRODUCTS SORTED_BY_PRICE (DEC)
router.get('/filters/price_dec', (req, res, next) => {

    return Products.findAll({
        order: [
            ['price', 'DESC']
        ]
    }).then(products => {
        if (!products) {
    return res.status(404).send({
        message: 'products Not Found',
    });
}
return res.status(200).send(products);
})
.catch(error => res.status(400).send(error));
});

//GET ALL PRODUCTS SORTED_BY_NAME (ASC)
router.get('/filters/name_asc', (req, res, next) => {

    return Products.findAll({
        order: [
            ['name', 'ASC']
        ]
    }).then(products => {
        if (!products) {
    return res.status(404).send({
        message: 'products Not Found',
    });
}
return res.status(200).send(products);
})
.catch(error => res.status(400).send(error));
});

//GET ALL SORTED_BY_NAME (DEC)
router.get('/filters/name_dec', (req, res, next) => {

    return Products.findAll({
        order: [
            ['name', 'DESC']
        ]
    }).then(products => {
        if (!products) {
    return res.status(404).send({
        message: 'products Not Found',
    });
}
return res.status(200).send(products);
})
.catch(error => res.status(400).send(error));
});

// ALL REVIEWS FOR A CERTAIN PRODUCT
router.get('/:product_id/reviews', (req, res, next) => {

    return Reviews.findAll({
        where: {
            //limit: here we could specify a certain limit if relevant
            product_id: req.params.product_id
        }
    }).then(reviews => {
        if (!reviews) {
    return res.status(404).send({
        message: 'No reviews found',
    });
}
return res.status(200).send(reviews);
})
.catch(error => res.status(400).send(error));
});


//GET A CERTAIN REVIEW FOR A CERTAIN PRODUCT BY A CERTAIN USER
router.get('/:product_id/reviews/:user_id', (req, res, next) => {

    return Reviews.findAll({
        where: {
            product_id: req.params.product_id,
            user_id: req.params.user_id
        }
    }).then(reviews => {
        if (!reviews) {
    return res.status(404).send({ //Maybe this should happen also for empty array
        message: 'No reviews found',
    });
}
return res.status(200).send(reviews);
})
.catch(error => res.status(400).send(error));
});


/******************************TODOs*************************************************/

//maybe later:
//GET ALL SORTED_BY_RATING (ASC)
//GET ALL WITH AT LEAST RATING X (ASC)

//POST A CERTAIN REVIEW FOR A CERTAIN PRODUCT... NEED TO SPECIFY COMPOSITE KEYS FOR THIS TO WORK
router.post('/', (req, res, next) => {

    var newReview = new Reviews(req.body);
newReview.save(req.body).then(respons => {
    res.send("review for product saved");
})
.catch(err => {
    res.status(400).send("unable to save review");
});
});

/*******************************************************************************/

module.exports = router;
