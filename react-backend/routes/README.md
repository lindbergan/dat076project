There are three major sub-routers, all explained below:

    products.js: handles urls that connect to "products" and "reviews" in db. Also handles "search" and "filters" for "products"

    users.js: handles urls that connects to "users" in db (simple CRUD)

    carts.js: handles urls that connects to "carts" in db

Next follows a more specific description of the API
(HTTP command followed by complete url):


                                    /** -:The REST API:- **/

                                    ::::: products.js :::::

/* GET ALL PRODUCTS */
GET '/products'

/* GET PRODUCT BY ID */
GET '/products/:product_id'

/* UPDATE A PRODUCT */
PUT '/products'

/* DELETE A PRODUCT */
DELETE '/products/:product_id'

/* GET ALL PRODUCTS SORTED_BY_PRICE (ASC) */
GET '/products/filters/price_asc'

/* GET ALL PRODUCTS SORTED_BY_PRICE (DESC) */
GET '/products/filters/price_desc'

/* GET ALL PRODUCTS SORTED_BY_NAME (ASC) */
GET '/products/filters/name_asc'

/* GET ALL SORTED_BY_NAME (DESC) */
GET '/products/filters/name_desc'

/* GET ALL PRODUCTS FROM SEARCH [by name atm, could easily be extended] */
GET '/products/search/:searchstring'

/* GET ALL PRODUCTS SORTED_BY_PRICE (ASC) [SEARCH] */
GET '/products/search/:searchstring/filters/price_asc'

/* GET ALL PRODUCTS SORTED_BY_PRICE (DESC) [SEARCH] */
GET '/products/search/:searchstring/filters/price_desc'

/* GET ALL PRODUCTS SORTED_BY_NAME (ASC) [SEARCH] */
GET '/products/search/:searchstring/filters/name_asc'

/* GET ALL PRODUCTS SORTED_BY_NAME (DESC) [SEARCH] */
GET '/products/search/:searchstring/filters/name_desc'

/* GET ALL REVIEWS FOR A CERTAIN PRODUCT */
GET '/products/:product_id/reviews'

/* GET A CERTAIN REVIEW FOR A CERTAIN PRODUCT BY A CERTAIN USER */
GET '/products/:product_id/reviews/:user_id'

/* POST A CERTAIN REVIEW FOR A CERTAIN PRODUCT */
POST '/products/:product_id/reviews'

/* UPDATE A CERTAIN REVIEW FOR A CERTAIN PRODUCT */
PUT '/products/:product_id/reviews'

                                    ::::: carts.js :::::

/* GET USERS CART (including total_amount of products and information about the different products) */
GET '/carts/:user_id'

/* ADD PRODUCT TO USERS CART */
POST '/carts/:user_id'

/* REMOVE PRODUCT FROM CART */
DELETE '/carts/:user_id/:product_id'

/* CLEAR ENTIRE CART */
DELETE '/carts/:user_id'

/* UPDATE PRODUCT AMOUNT IN USERS CART */
PUT '/carts/:user_id/'

                                    ::::: users.js :::::

/* GET ALL USERS */
GET '/users'

/* GET USER BY ID */
GET '/users/:user_id'

/* ADD USER */
POST '/users'

/* DELETE USER */
DELETE '/users/:user_id'

/* UPDATE USER */
PUT '/users'
