//require('dotenv').config()///all in process.env
let jwt  = require('jsonwebtoken');
let  keys  = require('../Lib/Config/keys/Key')

let auth  = (req,res ,next)=>{
    let authValue   = req.headers.authorization  || req.headers.Authorization
    
    if(!authValue) return res.sendStatus(401)
    let token = authValue.split(" ")[1];
    //console.log(token,'token')
    jwt.verify(token, keys.ACCESS_TOKEN/*take it from memory*/,(err,user)=>{
      if(err) {req.cookies.session_expires= true;next()}//forbiden session has expired
      if(user){ 
         req.cookies.session_expires= false;           
          console.log(user, 'is auth')
         next();
      }
      //console.log(user)
        
       
    }) 
  //next();
}

module.exports = auth;