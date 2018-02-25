
//Create dummy users to populate the DB
const userTable = require('../tables/user');

module.exports = {

   populate: function(){
    userTable.create({
      firstName:  'John',
      lastName:   'Lennon',
      email:      'john@lennon.com',
      role:       'admin'
    });
  }
}
