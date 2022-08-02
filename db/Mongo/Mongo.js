const mongo  = require("mongoose");
const KEYS__  = require('../../Lib/Config/keys/Key').MONGO_URI
//const KEYS__  = process.env.MONGO_LOCAL;
const ALLTABELMODELS  = require("./AllTables"); 
// mongo.connect(KEYS__./*.mongoLocal/*/mongoLive2,{
 // console.log(KEYS__)
  mongo.connect(KEYS__ ,{
    useNewUrlParser:true,
    useUnifiedTopology: true, 
   
  //  useFindAndModify: false,
    //useCreateIndex: true 
    }).then(data=>{
      //console.log(data)
    return true;
}).catch(err=>{
  throw new Error(err+ " Detected")

})




// const { MongoClient, ServerApiVersion } = require('mongodb');
// //const uri = "mongodb+srv://<username>:<password>@portal.c57es.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(KEYS__, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   if(err) return err;
//   const collection = client.db("portal").collection("student");
//   console.log(collection, " IS COLLECTED")
//   // perform actions on the collection object
//   client.close();
// });

let mongoDBObject  = {

 

    getModel: (table)=>{
     
      return  ALLTABELMODELS[table];
  
      },
   
  

}


module.exports = mongoDBObject;

