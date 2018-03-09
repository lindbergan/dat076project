const express = require('express');
const router = express.Router();
var models = require('../database/models');
var Products = models.product;
var Reviews = models.review;

/******************************CRUDs*********************************************/

/* GET ALL PRODUCTS */
router.get('/', (req, res, next) => {

    return Products.findAll().then(product => {
        if (!product) {
            return res.status(404).send({message: 'No products found'});
        }
        return res.status(200).send(product);
    })
    .catch(error => {
        res.status(400).send(error)
    });
});

/* GET PRODUCT BY ID */
router.get('/:product_id', (req, res, next) => {

    return Products.findById(req.params.product_id).then(product => {
        if (!product) {
            return res.status(404).send({message: 'Product Not Found'});
        }
        //INCLUDE OVERALL RATING
        Reviews.findAll({
            attributes: [[models.sequelize.fn('AVG', models.sequelize.col('rating')), 'avg_rating']],
            where: {
                product_id: req.params.product_id
            }
        }).then(avg =>{
            return res.status(200).send({
                product,
                rating: avg
            });
        }).catch(error => res.status(400).send(error));
    }).catch(error => res.status(400).send(error));
});

/* UPDATE A PRODUCT */
router.put('/', (req, res, next) => {

    Products.update(req.body,{
        where:{
            product_id: req.body.product_id,
        }
    }).then(respons => {
        res.status(200).send("Product updated");
    })
    .catch(err => {
        res.status(400).send("Unable to update product!");
    });
});

/* DELETE A PRODUCT */
router.delete('/:product_id', (req, res, next) => {

    Products.destroy({
        where: {
            product_id: req.params.product_id,
        }
    }).then(respons => {
        res.status(200).send("Product deleted");
    })
    .catch(err => {
        res.status(400).send("Unable to delete product");
    });
});

/******************************FILTERS*********************************************/

/* GET ALL PRODUCTS SORTED_BY_PRICE (ASC) */
router.get('/filters/price_asc', (req, res, next) => {

    return Products.findAll({
        order: [
            ['price', 'ASC']
        ]
    }).then(products => {
        if (!products) {
            return res.status(404).send({message: 'No products found'});
        }
        return res.status(200).send(products);
    })
    .catch(error => res.status(400).send(error));
});

/* GET ALL PRODUCTS SORTED_BY_PRICE (DESC) */
router.get('/filters/price_desc', (req, res, next) => {

    return Products.findAll({
        order: [
            ['price', 'DESC']
        ]
    }).then(products => {
        if (!products) {
            return res.status(404).send({message: 'No products found'});
        }
        return res.status(200).send(products);
    })
    .catch(error => res.status(400).send(error));
});

/* GET ALL PRODUCTS SORTED_BY_NAME (ASC) */
router.get('/filters/name_asc', (req, res, next) => {

    return Products.findAll({
        order: [
            ['name', 'ASC']
        ]
    }).then(products => {
        if (!products) {
            return res.status(404).send({message: 'No products found'});
        }
        return res.status(200).send(products);
    })
    .catch(error => res.status(400).send(error));
});

/* GET ALL SORTED_BY_NAME (DESC) */
router.get('/filters/name_desc', (req, res, next) => {

    return Products.findAll({
        order: [
            ['name', 'DESC']
        ]
    }).then(products => {
        if (!products) {
            return res.status(404).send({message: 'No products found'});
        }
        return res.status(200).send(products);
    })
    .catch(error => res.status(400).send(error));
});

/******************************SEARCH*******************************************/

/* GET ALL PRODUCTS FROM SEARCH [by name atm, could easily be extended] */
router.get('/search/:searchstring', (req, res, next) => {

    return Products.findAll({
        where: {
            name: {
                $like: '%' + req.params.searchstring + '%'
            }
        },
    }).then(products => {
        if (!products) {
            return res.status(404).send({message: 'No products found'});
        }
        return res.status(200).send(products);
    })
    .catch(error => res.status(400).send(error));
});

/* GET ALL PRODUCTS SORTED_BY_PRICE (ASC) [SEARCH] */
router.get('/search/:searchstring/filters/price_asc', (req, res, next) => {

    return Products.findAll({
        where: {
            name: {
                $like: '%' + req.params.searchstring + '%'
            }
        },
        order: [
            ['price', 'ASC']
        ]
    }).then(products => {
        if (!products) {
            return res.status(404).send({message: 'No products found'});
        }
        return res.status(200).send(products);
    })
    .catch(error => res.status(400).send(error));
});

/* GET ALL PRODUCTS SORTED_BY_PRICE (DESC) [SEARCH] */
router.get('/search/:searchstring/filters/price_desc', (req, res, next) => {

    return Products.findAll({
        where: {
            name: {
                $like: '%' + req.params.searchstring + '%'
            }
        },
        order: [
            ['price', 'DESC']
        ]
    }).then(products => {
        if (!products) {
            return res.status(404).send({message: 'No products found'});
        }
        return res.status(200).send(products);
    })
    .catch(error => res.status(400).send(error));
});

/* GET ALL PRODUCTS SORTED_BY_NAME (ASC) [SEARCH] */
router.get('/search/:searchstring/filters/name_asc', (req, res, next) => {

    return Products.findAll({
        where: {
            name: {
                $like: '%' + req.params.searchstring + '%'
            }
        },
        order: [
            ['name', 'ASC']
        ]
    }).then(products => {
        if (!products) {
            return res.status(404).send({message: 'No products found'});
        }
        return res.status(200).send(products);
    })
    .catch(error => res.status(400).send(error));
});

/* GET ALL PRODUCTS SORTED_BY_NAME (DESC) [SEARCH] */
router.get('/search/:searchstring/filters/name_desc', (req, res, next) => {

    return Products.findAll({
        where: {
            name: {
                $like: '%' + req.params.searchstring + '%'
            }
        },
        order: [
            ['name', 'DESC']
        ]
    }).then(products => {
        if (!products) {
            return res.status(404).send({message: 'No products found'});
        }
        return res.status(200).send(products);
    })
    .catch(error => res.status(400).send(error));
});

/******************************REVIEWS*********************************************/

/* GET ALL REVIEWS FOR A CERTAIN PRODUCT */
router.get('/:product_id/reviews', (req, res, next) => {

    return Reviews.findAll({
        where: {
            product_id: req.params.product_id
        }
    }).then(reviews => {
        if (!reviews) {
            return res.status(404).send({message: 'No available reviews for selected product'});
        }
        return res.status(200).send(reviews);
    })
    .catch(error => res.status(400).send(error));
});

/* GET A CERTAIN REVIEW FOR A CERTAIN PRODUCT BY A CERTAIN USER */
router.get('/:product_id/reviews/:user_id', (req, res, next) => {

    return Reviews.findAll({
        where: {
            product_id: req.params.product_id,
            user_id: req.params.user_id
        }
    }).then(reviews => {
        if (!reviews) {
            return res.status(404).send({message: 'No review on product done by user'});
        }
        return res.status(200).send(reviews);
    })
    .catch(error => res.status(400).send(error));
});

/* POST A CERTAIN REVIEW FOR A CERTAIN PRODUCT */
router.post('/:product_id/reviews', (req, res, next) => { //req = body of the new review

    var newReview = new Reviews(req.body);
    newReview.save(req.body).then(respons => {
        res.status(200).send("Review for product saved");
    })
    .catch(err => {
        res.status(400).send("Unable to save review");
    });
});

/* UPDATE A CERTAIN REVIEW FOR A CERTAIN PRODUCT */
router.put('/:product_id/reviews', (req, res, next) => {

    Reviews.update(req.body,{
        where:{
            user_id: req.body.user_id,
            product_id: req.params.product_id
        }
    }).then(respons => {
        res.status(200).send("Review updated");
    })
    .catch(err => {
        res.status(400).send("Unable to update review");
    });
});

module.exports = router;
