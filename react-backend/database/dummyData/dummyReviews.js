
//Create dummy reviews to populate the DB

var dummyReviews = [];
const userComment = 'The product lived up to the expectations'
const amount = 50;
const nmbrOfDummyUsers = 10;
const nmbrOfDummyProd = 20;

for (var i = 1; i <= amount; i++) {
    dummyReviews.push(
        {
            comment:    userComment,
            user_id:    Math.ceil(Math.random() * nmbrOfDummyUsers).toString(),
            product_id: Math.ceil(Math.random() * nmbrOfDummyProd),
            rating:     Math.round(Math.random() * 5) //somewhere between 1-5
        }
    )
}

module.exports = dummyReviews;

