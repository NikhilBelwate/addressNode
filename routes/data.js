var express = require('express');
const Address = require('../model/Address').Address;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:password5542@addresscluster.nwqvg.mongodb.net/AddressBookDB?retryWrites=true&w=majority";

var router = express.Router();

/* GET address data listing. */
router.get('/', function(req, res, next) {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    console.log("Done");
    client.connect(err => {
        if (err) res.send(err);
        
        const collection = client.db("AddressBookDB").collection("AddressBookCollection");
        collection.find({}).toArray(function(err, result) {
            if (err) res.send(err);
            res.send(result);
          });
        console.log("Database connected");
        // perform actions on the collection object
        client.close();
      });
    //let addr=new Address("nik","beal","nik@gmail.com","9892137573, 5823101022","NA");
  //res.send(addr);
});

/*Insert new record in DB */
router.post('/insert', function(req, res, next) {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    let addr=req.body;
    console.log("res22"+ JSON.stringify(addr));
    client.connect(err => {
        if (err) res.send(err);
        const collection = client.db("AddressBookDB").collection("AddressBookCollection");
        collection.insertOne(addr,function(err, result) {
            console.log("res"+ addr+ err);

            if (err) res.send(err);
            res.send(result);
          });
        //perform actions on the collection object
        client.close();
      });
  
});
/*Update record in DB */
router.put('/update', function(req, res, next) {
    console.log("in put");
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        if (err) res.send(err);

        let addr=req.body.newdata;
        console.log(JSON.stringify(addr));
        var myquery = req.body.query;
        console.log(JSON.stringify(myquery));
        var newvalues = { $set: addr };
  
        const collection = client.db("AddressBookDB").collection("AddressBookCollection");
        collection.updateOne(myquery,newvalues,function(err, result) {
            if (err) res.send(err);
            res.send(result);
          });
        //perform actions on the collection object
        client.close();
      });
    });
      router.delete('/delete', function(req, res, next) {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            if (err) res.send(err);
            var myquery = { firstName: "nikhil", lastName: "belwate"};
            
            const collection = client.db("AddressBookDB").collection("AddressBookCollection");
            collection.deleteOne(myquery,function(err, result) {
                if (err) res.send(err);
                res.send(result);
              });
            //perform actions on the collection object
            client.close();
          });
    
});

module.exports = router;