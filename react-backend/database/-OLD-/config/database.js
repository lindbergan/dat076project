
//NOTE: need to have db access for user "root" with password "admin"
//NOTE: This is our ORM-layer. Can be replaced with another DB in the future.
// However - is the syntax used in the buisness logic the same for all relational DB:s?
// (if so - sequelize gives us both object -> relation mapping + DAO abstraction...)

//later on: import all the tables here instead

//NOTE: You need to crete a SCHEMA in SQL workbench that has the name 'webshop' and allow user: 'root' with the passord: 'admin' in order to communicate with the db
var Sequelize = require('sequelize');
var database = new Sequelize('webshop', 'root', 'admin', {
 host: 'localhost',
 dialect: 'mysql',
 operatorsAliases: false, //hmm...
 define: {
 timestamps: false,
 }
});

//database.User = database.sequelize.import('../tables/user');
//db.Location = db.sequelize.import('../api/location/location.model');
//db.User = db.sequelize.import('../api/user/user.model');
//db.Thing = db.sequelize.import('../api/thing/thing.model');

//**************************DEFINING THE TABLES************************/

var User = database.define('user', {
  //id: {
    //primaryKey:     Sequelize.TRUE,
    //unique:         Sequelize.TRUE,
    //autoIncrement:  Sequelize.TRUE,
    //type:           Sequelize.INTEGER
  //},
  firstName:        Sequelize.STRING,
  lastName:         Sequelize.STRING,
  email:            Sequelize.STRING,
  role:             Sequelize.STRING
  //profile_pic:  sequelize.IMAGE
});

var ShoppingCart = database.define('product', {
  //id: {
  //  type:           Sequelize.INTEGER,
  //  autoIncrement:  Sequelize.TRUE,
  //  primaryKey:     Sequelize.TRUE
  //},
  price:            Sequelize.DOUBLE,
  description:      Sequelize.TEXT,
  //image:          Sequelize.IMAGE
});

//*******************************************************************/

database.sync({force: true}).then(() => {

  User.create({
    firstName:  'John',
    lastName:   'Lennon',
    email:      'john@lennon.com',
    role:       'admin'
  });
  User.create({
    firstName:  'Edgar Allan',
    lastName:   'Poe',
    email:      'allan@poe.com',
    role:       'admin'
  });

  ShoppingCart.create({
    price:  120.0,
    description:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, ',
  });

});

module.exports.database = database;
