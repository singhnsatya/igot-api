const express = require('express');
const routes = require('./routes')
const db = require('./config/db.json')
const mongodb = require('mongodb');
const app = express();
global.Promise = require('bluebird');
const bodyParser = require('body-parser');


var MongoClient = mongodb.MongoClient;
    global.collection = mongodb.Collection;

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(routes);

Promise.promisifyAll(collection.prototype);
Promise.promisifyAll(MongoClient);
  global.MongoClient = MongoClient;
  MongoClient.connect(db.mlab,(err,db)=>{
   if(!err)
    global.collection = db.collection('battles');
   else
    console.log('Error in Mongodb',err)
  
  })
  
app.listen(port, () => {
	console.log('running at '+port)
})