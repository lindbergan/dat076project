
//Create dummy products to populate the DB

var dummyProducts = [];
const descLoremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const amount = 20;
for (var i = 1; i <= amount; i++) {
  dummyProducts.push(
    {
      product_id:   i,
      name:         ("Product " + i).toString(),
      price:        Math.round(Math.random() * 100),
      description:  descLoremIpsum,
      prodimgurl:   '../images/productDummy.img',
    }
  )
}

module.exports = dummyProducts;

//{ product_id: 1, name: 'foo', price: 10.0, description: 'this is a somewhat useful product', prodimgurl: './images/productpic.img'})