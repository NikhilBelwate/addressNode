//code for connection test

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:password5542@addresscluster.nwqvg.mongodb.net/AddressBookDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  if (err) throw err;
  
  const collection = client.db("AddressBookDB").collection("AddressBookCollection");
  
  console.log("Database connected");
  // perform actions on the collection object
  client.close();
});
