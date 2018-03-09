const express = require('express');
const router = express.Router();
var models = require('../database/models');
var Carts = models.cart;
var Products = models.product;

/* GET USERS CART (including total_amount of products and information about the different products) */
router.get('/:user_id', (req, res, next) => {

    return Carts.findAll({
        where: {
            user_id: req.params.user_id
        },     include: {
            model: models.product,
            required: true,
        }
    }).then(cart => {

        if (!cart) {
            return res.status(404).send({
                message: 'User has no cart',
            });
        };

        //GET TOTAL #ITEMS IN CART
        Carts.sum('amount', {
            where: {
                user_id: req.params.user_id,
            }}).then(total_amount => {
                return res.status(200).send({cart, total_amount: total_amount});
                }).catch(error => {
                    res.status(400).send(error)
                });
        })
    .catch(error => {
        res.status(400).send(error);
    });
});


/* ADD PRODUCT TO USERS CART */
router.post('/:user_id', (req, res, next) => {

    var newCart = new Carts(req.body);
    newCart.save(req.body).then(respons => {
        res.send("Item saved to cart");
    })
    .catch(err => {
        res.status(400).send("Unable to save product to user's cart");
    });
});

/* REMOVE PRODUCT FROM CART */
router.delete('/:user_id/:product_id', (req, res, next) => {
  Carts.destroy({
        where: {
            user_id: req.params.user_id,
            product_id: req.params.product_id
        }
    }).then(respons => {
        res.send("Product deleted from user's cart");
    })
    .catch(err => {
    res.status(400).send("Unable to delete product to user's cart");
    });
});

/* CLEAR ENTIRE CART */
router.delete('/:user_id', (req, res, next) => {
    Carts.destroy({
        where: {
            user_id: req.params.user_id,
        }
    }).then(respons => {
        res.send("Products deleted from user's cart");
    })
    .catch(err => {
        res.status(400).send("Unable to delete user's cart");
    });
});

/* UPDATE PRODUCT AMOUNT IN USERS CART */
router.put('/:user_id/', (req, res, next) => {

    Carts.update(req.body,{
        where:{
            user_id: req.params.user_id,
            product_id: req.body.product_id
        }
    }).then(respons => {
        res.send("Cart updated!");
    })
    .catch(err => {
        res.status(400).send("Unable to update user's cart");
    });
});

module.exports = router;
