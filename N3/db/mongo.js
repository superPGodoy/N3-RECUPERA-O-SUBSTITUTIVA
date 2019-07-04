let cervejoDb = null;
var mongoLib = require('mongodb');
var MongoClient = mongoLib.MongoClient;
var ObjectID = mongoLib.ObjectID;

const csv = require('csvtojson');
const caminho = 'cervejo.csv';
csv().fromFile(caminho).then((jsonObj) => {
  MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
    if (err) {
      console.log(err);
    }
    else{
      var dbase = db.db("C_Cerveja");
      dbase.collection("analytics").drop(function(){
  
      });
      dbase.createCollection('analytics', function(){
        dbase.collection("analytics").insertMany(jsonObj);
      });
  
      cervejoDb = dbase;
    }
  });
});

const getDB = () => cervejoDb;

module.exports = {
  getDB, ObjectID
    
}




