const path     = require('path');
let bcrypt  = require('bcrypt')


const root_folder  = require('../../../Lib/Config/keys/Key').ROOT_FOLDER
let re   = new RegExp(`.+${root_folder}`)
let root  = re.exec(__dirname)? re.exec(__dirname)[0]:__dirname 
let studentModel= require(path.join(root,'Model','student.json') );
let fs = require(path.join(root,'Lib','Fs','Fs.js'))
let is_auth =  require(path.join(root,'Middleware','JWTAuth.js')) ///custome jwt with no passport
let studentDb    = require('./../../../db/Mysql/SequenlizeDB').tables
console.log(studentDb,"ertyui")
let all_auth   = require('./../../../Middleware/Auth')
let refreshToken = require('./RefrehJWTToken').refreshToken
//console.log(studentModel );
let Dashboard = (router)=>{
router.get(
  ['/student/dashboard'], 

 // require('./RefrehToken') ,  
 
 //all_auth.is_auth, 
  //is_auth,
   all_auth.passport_local_check_login,
  (req,res)=>{
    if(req.cookies.session_expires){
      //fresh the token
   
       refreshToken(req,res,(token)=>{
        req.cookies.session_expires  = false;
        res.send(`<h2>Student dashboar Area  to refresh <br /> ${token} </h2>`)

       })
      
    }else{
      res.send(`<h2>Student dashboar Area   </h2>`)
    }
      console.log(req.cookies.session_expires)
    // mysql_custome_auth(req,res,studentDb,'./student/login',(data)=>{
    //   if(data) console.log(data)
    // })

   
    //  require('./RefrehJWTToken')(req,res,(token)=>{
    //   res.send(`<h2>Student dashboar Area ${token} </h2>`)
    // }) 
     
   // res.sendFile(path.join(root, 'view', 'components', 'student', 'register.html') );
})

 

}  


module.exports  = Dashboard;