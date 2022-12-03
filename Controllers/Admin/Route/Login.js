const path     = require('path');
const keys  = require('../../../Lib/Config/keys/Key')
let re   = new RegExp(`.+${keys.ROOT_FOLDER}`)
let root  = re.exec(__dirname)? re.exec(__dirname)[0]:__dirname 
const passport   = require('passport')
let randomStr  = require('./../../../Lib/Fs/RandonString')
let bcrypt  = require('bcrypt');
 require('dotenv').config()///all in process.env
 let jwt  = require('jsonwebtoken');
 let fs = require(path.join(root,'Lib','Fs','Fs.js'))
 let cookie_config    = require(path.join(root,'Lib','Config','Cookie.js'))
 let cookie_name  =keys.COOKIE_NAME
//  console.log(__dirname);
//  console.log(root);
let mongoDbTable  = require(path.join(root,'db','Mongo','Mongo')).getModel('admin')
let mysqlTable  = require('../../../db/Mysql/SequenlizeDB').tables.admin
// const loginWithPassportLocal  = require('./../../../Middleware/PassportAuthWithLocalStrategy')(passport,keys.DB_TYPE==='mongo'? mongoDbForStudent:mysqlStudentModel);
//const loginWithPassportJWT  = require('./../../../Middleware/PassportAuthWithJwtStrategy').login
let Login  = (router)=>{
 
    router.get(['/admin/login','/admin'],(req,res)=>{
       // res.send(`<h2>Student login Area</h2>`)
       res.sendFile(path.join(root, 'view', 'components', 'admin', 'login.html') );
    })
   



    const loginFun  =(req,res,next)=>{
      
    ////////////////////////////////////////////one
 async  function useMysqlToLoginJwT(){

   
    let user  = await mysqlTable .findOne({
        where:{
          email:req.body.email
        }
      })
     
     
    if(!user) return res.json({err:"invalid credential not found"})  
    
    let match = await bcrypt.compare(req.body.pass,user.pa )
    
    if(!match) return res.json({err:"invalid credential"}) 
    ///this is a sesssion saved in memory, 
    let userDetails  = user;         
////////////////////////////////////////sign with private// verify with public////////////////////////////////////
    let access_token =await jwt.sign( 
       {user : userDetails.userId},
        keys.ACCESS_TOKEN, /*save in memory Not file or database*/
       {expiresIn:   '2h' },
        
       ); 
      
       let refresh_token = await jwt.sign(  
          {user : userDetails.userId}, 
          keys.REFRESH_TOKEN, /*save in memory Not file or database*/
          {expiresIn:  '7d' },
        
          ); 

         res.cookie(cookie_name,refresh_token, cookie_config)//7 days
         user.sessionToken  = refresh_token
         let userHasLogin  = await mysqlTable.update({sessionToken:refresh_token},{where:{userId:user.userId}})//save the access token in your database
        // console.log(userHasLogin)
       
        if(!userHasLogin[0]) return res.json({err:"System is unable to register tour session, try again"})
        

   // router.use(require('../../../Lib/Config/session/Session').session('mysql'));
    //console.log(req.session)
  
    res.json({
       // user, 
       // match, 
       access_token: `Bearer ${access_token}`,
       refresh_token})
       next();
      }


      useMysqlToLoginJwT()
    
    }
     router.post('/admin/post-login',
    // loginWithPassportJWT(mysqlTable,'email',passport)
       loginFun
     )
    
  
  

    }  
    

 

module.exports  = Login; // res.json({user:userDetails });  
        