
//Create dummy users to populate the DB
const userTable = require('../models/user');

module.exports = {

   populate: function(){
    userTable.create({
      user_id: 10
      firstName:  'John',
      lastName:   'Lennon',
      email:      'john@lennon.com',
      role:       'admin'
    });
  }
}
