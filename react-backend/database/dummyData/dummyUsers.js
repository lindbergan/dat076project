
//Create dummy users to populate the DB

var dummyUsers = [];

const amount = 10;
for (var i = 1; i <= amount; i++) {
    dummyUsers.push(
        {
            user_id:        i.toString(),
            firstName:      ('User' + i).toString(),
            lastName:       '***',
            email:          ('user' + i + '@gmail.com').toString(),
            role:           'admin',
            userimgurl:     '../images/profileDummy.img'
        }
    )
}

module.exports = dummyUsers;


