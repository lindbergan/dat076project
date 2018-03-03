const express = require('express');
const router = express.Router();
var models = require('../database/models');
var Carts = models.shoppingCart;

//GET USERS CART
router.get('/:user_id', (req, res, next) => {

  return Carts.findAll({
    where: {
        user_id: req.params.user_id
    }}).then(cart => {

    if (!cart) {
        return res.status(404).send({
        message: 'user has no carts',
        });
    };
    return res.status(200).send(cart);
  })
.catch(error => res.status(400).send(error));
});

// POST PRODUCT TO USERS CART
router.post('/', (req, res, next) => {

    var newCart = new Carts(req.body);
    newCart.save(req.body).then(respons => {
    res.send("item saved to cart");
    })
.catch(err => {
    res.status(400).send("unable to save product to users cart");
});
});

router.delete('/:user_id/:product_id', (req, res, next) => {
  /* Remove existing product from cart */
  Carts.destroy({
        where: {
            user_id: req.params.user_id,
            product_id: req.params.product_id
        }
    }).then(respons => {
    res.send("product deleted from users cart");
})
.catch(err => {
    res.status(400).send("unable to delete product to users cart");
});
});

router.delete('/:user_id', (req, res, next) => {
  /* Clears the entire cart */
    Carts.destroy({
    where: {
        user_id: req.params.user_id,
    }
}).then(respons => {
    res.send("product deleted from users cart");
})
.catch(err => { //A bit strange that it isn't considered an error when trying to delete something that doesn't exist...
    res.status(400).send("unable to delete product to users cart");
});
});

/*********************************TODOs**************************************/
//GET TOTAL PRICE FOR CART
router.get('/:user_id/total_price', (req, res, next) => {
});

//GET TOTAL #ITEMS IN CART
router.get('/:user_id/total_amount', (req, res, next) => {
});

//UPDATE AMOUNT
router.put('/', (req, res, next) => {
    /* Update existing product amount in cart */
});

/****************************************************************************/

module.exports = router;
