const path     = require('path');
const keys  = require('../../../Lib/Config/keys/Key')
let re   = new RegExp(`.+${keys.ROOT_FOLDER}`)
let root  = re.exec(__dirname)? re.exec(__dirname)[0]:__dirname 
const passport   = require('passport')

let bcrypt  = require('bcrypt');
 let studentModel= require(path.join(root,'Model','student.json') );
 require('dotenv').config()///all in process.env
 let jwt  = require('jsonwebtoken');
 let fs = require(path.join(root,'Lib','Fs','Fs.js'))
 let cookie_config    = require(path.join(root,'Lib','Config','Cookie.js'))
 let cookie_name  =keys.COOKIE_NAME
//  console.log(__dirname);
//  console.log(root);
let mongoDbForStudent  = require(path.join(root,'db','Mongo','Mongo')).getModel('student')
let mysqlStudentModel  = require('../../../db/Mysql/SequenlizeDB').tables.student
require('./../../../Middleware/PassportAuthWithLocalStrategy')(passport,keys.DB_TYPE==='mongo'? mongoDbForStudent:mysqlStudentModel);
let Login  = (router)=>{
 
    router.get(['/student/login','/student'],(req,res)=>{
       // res.send(`<h2>Student login Area</h2>`)
       res.sendFile(path.join(root, 'view', 'components', 'student', 'login.html') );
    })
   
     router.post('/student/post-login',
     passport.authenticate('local'), 
    
    (req,res)=>{
    return  res.send("ok")
     
    async  function useMysqlToLoginJwT(){
      console.log(" THIS IS CALL MYSQL")
         let mysqlStudentModel  = require('../../../db/Mysql/SequenlizeDB').tables.student
         let user  = await mysqlStudentModel.findOne({
             where:{
               email:req.body.email
             }
           })
           user = user?user.dataValues:null;
          
         if(!user) return res.json({err:"invalid credential not found"})  
         
         let match = await bcrypt.compare(req.body.pass,user.pa )
         
         if(!match) return res.json({err:"invalid credential"}) 
         ///this is a sesssion saved in memory, 

         let userDetails  = user;         
 //////////////////////////////////////////////////////////////////////////////
         let access_token =await jwt.sign( 
            {user : userDetails.userId},
             keys.ACCESS_TOKEN, /*save in memory Not file or database*/
            { expiresIn:   '2m' },
             
            ); 
           
        
            // console.log( access_token,jwt)   
        
            let refresh_token = await jwt.sign(  
               {user : userDetails.userId}, 
               keys.REFRESH_TOKEN, /*save in memory Not file or database*/
               { expiresIn:  '7d'  },
              
              
               ); 

              res.cookie(cookie_name,refresh_token, cookie_config)//7 days
              user.sessionToken  = refresh_token
              let userHasLogin  = await mysqlStudentModel.update({sessionToken:refresh_token},{where:{userId:user.userId}})//save the access token in your database
             // console.log(userHasLogin)
            
             if(!userHasLogin[0]) return res.json({err:"System is unable to register tour session, try again"})
             

        // router.use(require('../../../Lib/Config/session/Session').session('mysql'));
         //console.log(req.session)
         res.json({
            // user, 
            // match, 
            access_token,
            refresh_token})

     

      }

      

   async function useMongoToLoginJWT(){
         let mongoStudentModel  = require(path.join(root,'db','Mongo','Mongo')).getModel('student');
         let user  = await mongoStudentModel.findOne({
          
              email:req.body.email
          
          },'userId pa email')
         // user = user?user.dataValues:null;
         console.log(user)
        if(!user) return res.json({err:"invalid credential not found"})  
        
        let match = await bcrypt.compare(req.body.pass,user.pa )
        
        if(!match) return res.json({err:"invalid credential"}) 
        ///this is a sesssion saved in memory, 

        let userDetails  = user;         
//////////////////////////////////////////////////////////////////////////////
        let access_token =await jwt.sign( 
           {user : userDetails.userId},
            keys.ACCESS_TOKEN, /*save in memory Not file or database*/
           { expiresIn:   '2m' },
            
           ); 
          
       
           // console.log( access_token,jwt)   
       
           let refresh_token = await jwt.sign(  
              {user : userDetails.userId}, 
              keys.REFRESH_TOKEN, /*save in memory Not file or database*/
              { expiresIn:  '7d'  },
             
             
              ); 

             res.cookie(cookie_name,refresh_token, cookie_config)//7 days
             user.sessionToken  = refresh_token
             await user.save()
             //let userHasLogin  = await mongoStudentModel.update({userId:user.userId},{sessionToken:refresh_token})//save the access token in your database
            // console.log(userHasLogin)
           
           // if(!userHasLogin[0]) return res.json({err:"System is unable to register tour session, try again"})
            

       // router.use(require('../../../Lib/Config/session/Session').session('mysql'));
        //console.log(req.session)
        res.json({
           // user, 
           // match, 
           access_token,
           refresh_token})
          
      }







   // keys.DB_TYPE ==='mysql'?useMysqlToLoginJwT():keys.DB_TYPE==='mongo'?useMongoToLoginJWT():res.json({err:"db type is not set in .env"})


   })
  

    }  
    

 

module.exports  = Login; // res.json({user:userDetails });  
        