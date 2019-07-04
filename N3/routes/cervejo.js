var express = require('express');
var router = express.Router();
mongo = require('../db/mongo')

router.get('/', function(_req,res) {
    mongo.getDB().collection("analytics").find().toArray().then(function(data){
      res.send({'data': data});
    }).catch(function(err){
      console.log(err);
    });
  });

router.delete('/:DadoId', function(req,res){
  var DadoId = req.params.DadoId;
  mongo.getDB().collection("analytics").deleteOne({_id: new mongo.ObjectID(DadoId)});
  res.end();
})

router.post('/', function(req,res){
  mongo.getDB().collection("analytics").insert(req.body);
  res.end();
})

module.exports = router;