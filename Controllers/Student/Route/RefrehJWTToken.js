const path     = require('path');
const keys  = require('../../../Lib/Config/keys/Key')
let re   = new RegExp(`.+${keys.ROOT_FOLDER}`)
let root  = re.exec(__dirname)? re.exec(__dirname)[0]:__dirname 
let cookie_name  = process.env.COOKIE_NAME
 
 let studentModel= require(path.join(root,'Model','student.json') );
 require('dotenv').config()///all in process.env
 let jwt  = require('jsonwebtoken');
 let fs = require(path.join(root,'Lib','Fs','Fs.js'))


let refreshTokenMysql  = async (req,res, callback )=>{
       const  mysqlStudentModel  = require('../../../db/Mysql/SequenlizeDB').tables.student
       let cookies  = req.cookies
       if(!cookies[  cookie_name] ) return res.sendStatus(401)
       let refToken = cookies[cookie_name];
       console.log(refToken,cookies)
     //  let user   = {...req.body,user:req.body.email,pass:req.body.pass}
     let user  = await mysqlStudentModel.findOne({
      attributes:['sessionToken'],
      where:{
        sessionToken:refToken
      }
    })
  //  console.log(user)
    user = user?user.dataValues:null;
    
     userDetails  = user
      // let otherUser  = studentModel.filter(users=>users.email !=  user.email )  ;

        if(!userDetails){
         return res.sendStatus(401)
        } 
 

         console.log(userDetails,'user refresh');
        jwt.verify(refToken, keys.REFRESH_TOKEN,(err,user)=>{
         if(err || refToken !== userDetails.sessionToken) return res.sendStatus(403)
         console.log(user)
         
         let access_token = jwt.sign( 
            {user : userDetails.userId},
             keys.ACCESS_TOKEN, 
            { expiresIn:   '2m' },
             
            ); 
          
            

         return callback(access_token)  
        
     }) 

  
      // next()
    }  
    

    let refreshTokenMongo  = async (req,res, callback )=>{
      const  mysqlStudentModel  = require('../../../db/Mongo/Mongo').getModel('student')
      let cookies  = req.cookies
      if(!cookies[  cookie_name] ) return res.sendStatus(401)
      let refToken = cookies[cookie_name];
      console.log(refToken,cookies)
    //  let user   = {...req.body,user:req.body.email,pass:req.body.pass}
    let user  = await mysqlStudentModel.findOne({
 
       sessionToken:refToken
 
   },'sessionToken')
 //  console.log(user)
   
   
    userDetails  = user
     // let otherUser  = studentModel.filter(users=>users.email !=  user.email )  ;

       if(!userDetails){
        return res.sendStatus(401)
       } 


        console.log(userDetails,'user refresh');
       jwt.verify(refToken, keys.REFRESH_TOKEN,(err,user)=>{
        if(err || refToken !== userDetails.sessionToken) return res.sendStatus(403)
        console.log(user)
        
        let access_token = jwt.sign( 
           {user : userDetails.userId},
            keys.ACCESS_TOKEN, 
           { expiresIn:   '2m' },
            
           ); 
         
           

        return callback(access_token)  
       
    }) 

 
     // next()
   }  
   

module.exports  = {
  refreshToken:keys.DB_TYPE==='mysql'?refreshTokenMysql
  :keys.DB_TYPE==='mongo'?refreshTokenMongo:null }; // res.json({user:userDetails });  
        