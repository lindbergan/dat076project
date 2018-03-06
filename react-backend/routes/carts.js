const express = require('express');
const router = express.Router();
var models = require('../database/models');
var Carts = models.cart;

/*****************************************************************/

/* GET USERS CART (INC AMOUNT, TOTAL_PRICE) */
router.get('/:user_id', (req, res, next) => {

  return Carts.findAll({
    where: {
        user_id: req.params.user_id
    }}).then(cart => {

    if (!cart) {
        return res.status(404).send({
        message: 'user has no products in carts',
        });
    };

//GET TOTAL #ITEMS IN CART
Carts.sum('amount', {
        where: {
            user_id: req.params.user_id
        }}).then(sum => {
        //GET TOTAL PRICE FOR CART

            

    //Carts.sum('amount'*'price')
    return res.status(200).send(
        {cart,
            amount: sum,
            price: 4
        });
  })
.catch(error => res.status(400).send(error));
}).catch(error => res.status(400).send(error));
});


/*****************************************************************/
/* ADD PRODUCT TO USERS CART */
router.post('/:user_id', (req, res, next) => {

    var newCart = new Carts(req.body);
    newCart.save(req.body).then(respons => {
    res.send("item saved to cart");
    })
.catch(err => {
    res.status(400).send("unable to save product to users cart");
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
    res.send("product deleted from users cart");
})
.catch(err => {
    res.status(400).send("unable to delete product to users cart");
});
});

/* CLEAR ENTIRE CART */
router.delete('/:user_id', (req, res, next) => {
    Carts.destroy({
    where: {
        user_id: req.params.user_id,
    }
}).then(respons => {
    res.send("products deleted from users cart");
})
.catch(err => {
    res.status(400).send("unable to delete product to users cart");
});
});

/* UPDATE PRODUCT AMOUNT IN USERS CART */
router.put('/:user_id/', (req, res, next) => {

    Carts.update(req.body,{
        where:{
            user_id: req.body.user_id,
            product_id: req.body.product_id
        }
}).then(respons => {
    res.send("cart updated!");
})
.catch(err => {
    res.status(400).send("unable to save product to users cart");
});
})

module.exports = router;
