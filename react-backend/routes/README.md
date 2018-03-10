There are three major sub-routers, all explained below:

    products.js: handles urls that connect to "products" and "reviews" in db. <br/>
    Also handles "search" and "filters" for "products"

    users.js: handles urls that connects to "users" in db (simple CRUD)

    carts.js: handles urls that connects to "carts" in db

Next follows a more specific description of the API <br/>
(HTTP command followed by complete url):


                                    /** -:The REST API:- **/

                                    ::::: products.js :::::

/* GET ALL PRODUCTS */ <br/>
GET '/products'

/* GET PRODUCT BY ID */ <br/>
GET '/products/:product_id'

/* UPDATE A PRODUCT */ <br/>
PUT '/products'

/* DELETE A PRODUCT */ <br/>
DELETE '/products/:product_id'

/* GET ALL PRODUCTS SORTED_BY_PRICE (ASC) */ <br/>
GET '/products/filters/price_asc'

/* GET ALL PRODUCTS SORTED_BY_PRICE (DESC) */ <br/>
GET '/products/filters/price_desc'

/* GET ALL PRODUCTS SORTED_BY_NAME (ASC) */ <br/>
GET '/products/filters/name_asc'

/* GET ALL SORTED_BY_NAME (DESC) */ <br/>
GET '/products/filters/name_desc'

/* GET ALL PRODUCTS FROM SEARCH [by name atm, could easily be extended] */ <br/>
GET '/products/search/:searchstring'

/* GET ALL PRODUCTS SORTED_BY_PRICE (ASC) [SEARCH] */ <br/>
GET '/products/search/:searchstring/filters/price_asc'

/* GET ALL PRODUCTS SORTED_BY_PRICE (DESC) [SEARCH] */ <br/>
GET '/products/search/:searchstring/filters/price_desc'

/* GET ALL PRODUCTS SORTED_BY_NAME (ASC) [SEARCH] */ <br/>
GET '/products/search/:searchstring/filters/name_asc'

/* GET ALL PRODUCTS SORTED_BY_NAME (DESC) [SEARCH] */ <br/>
GET '/products/search/:searchstring/filters/name_desc'

/* GET ALL REVIEWS FOR A CERTAIN PRODUCT */ <br/>
GET '/products/:product_id/reviews'

/* GET A CERTAIN REVIEW FOR A CERTAIN PRODUCT BY A CERTAIN USER */ <br/>
GET '/products/:product_id/reviews/:user_id'

/* POST A CERTAIN REVIEW FOR A CERTAIN PRODUCT */ <br/>
POST '/products/:product_id/reviews'

/* UPDATE A CERTAIN REVIEW FOR A CERTAIN PRODUCT */ <br/>
PUT '/products/:product_id/reviews'

                                    ::::: carts.js :::::

/* GET USERS CART (including total_amount of products and information about the different products) */ <br/>
GET '/carts/:user_id'

/* ADD PRODUCT TO USERS CART */ <br/>
POST '/carts/:user_id'

/* REMOVE PRODUCT FROM CART */ <br/>
DELETE '/carts/:user_id/:product_id'

/* CLEAR ENTIRE CART */ <br/>
DELETE '/carts/:user_id'

/* UPDATE PRODUCT AMOUNT IN USERS CART */ <br/>
PUT '/carts/:user_id/'

                                    ::::: users.js :::::

/* GET ALL USERS */ <br/>
GET '/users'

/* GET USER BY ID */ <br/>
GET '/users/:user_id'

/* ADD USER */ <br/>
POST '/users'

/* DELETE USER */ <br/>
DELETE '/users/:user_id'

/* UPDATE USER */ <br/>
PUT '/users'
