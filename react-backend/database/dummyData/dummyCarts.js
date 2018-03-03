
//Create dummy carts to populate the DB

var dummyCarts = [];
const amount = 50;
const nmbrOfDummyUsers = 10;
const nmbrOfDummyProd = 20;

for (var i = 1; i <= amount; i++) {
    dummyCarts.push(
        {
            user_id:    Math.round(1 + Math.random() * nmbrOfDummyUsers),
            product_id: Math.round(1 + Math.random() * nmbrOfDummyProd),
            amount:     Math.round(Math.random() * 6) //somewhere between 1 - 5 #products
        }
    )
}

module.exports = dummyCarts;

//{ user_id: 2, product_id: 1, amount: 5}