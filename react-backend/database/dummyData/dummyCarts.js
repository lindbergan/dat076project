
//Create dummy carts to populate the DB

var dummyCarts = [];
const amount = 50;
const nmbrOfDummyUsers = 10;
const nmbrOfDummyProd = 20;

for (var i = 1; i <= amount; i++) {
    dummyCarts.push(
        {
            user_id:    Math.ceil(Math.random() * nmbrOfDummyUsers).toString(),
            product_id: Math.ceil(Math.random() * nmbrOfDummyProd),
            amount:     Math.round(1+ Math.random() * 5) //somewhere between 1 - 5 #products
        }
    )
}

module.exports = dummyCarts;

