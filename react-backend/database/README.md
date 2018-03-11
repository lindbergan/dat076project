In order to communicate with the DB you'll need to do the following:

 ...create a schema in MySQL Workbench with the name "webshop"
 ...create a user that can access that database that has the same credentials as specified under development in '/config/oonfig.json'

...NOTICE:
Since this is a development build, the moment we run npm start we re-create the tables
(that means all edits will be lost unless they are populated as dummy data during table creation).
If permanent data is needed - add that data to '/dummyData' and the relevant table.


