
const keys  = require('./../Lib/Config/keys/Key')
let passport_local_check_login  = (req,res, next)=>{
   if(req.isAuthenticated()){
       next()
   }else{
        res.sendStatus(401)
       //res.redirect("/student/login")//.json({err:"You are not logged in",s:req.isAuthenticated()})
    // return  res.json()
   }
}

let custome_is_auth_mysql   =(req,res,user_db,login_redirect_url,cb)=>{
const session_db  = require("../db/Mysql/SequenlizeDB").tables.sessions
    console.log(req.cookies)
let user_cookie  = req.cookies[keys.COOKIE_NAME]
if(user_cookie){
  //////////////////////////  
  session_db.findOne({where: {session_id: user_cookie}},(err,user)=>{
    user_db.findOne( {where: {_id: user.user_id}},(err,user_)=>{
       // console.log(user)
       // return {user:user_};
        cb({user:user_})

       // res.status(201).send({suc:user_})
    })

})  
////////////////////
}else{
    //console.log("FAILED")
    res.redirect(login_redirect_url)
    //return({err:"You are not autheticated"})
   // res.status(301).send({err:"You are not autheticated"})
}
//next()
  //res.send({"checking":user_cookie}) 

}

let logOut  = (res,cookieId)=>{
  session_db.deleteOne({cookie_id:cookieId},(err,suc)=>{
    if(err){
     
    }
  })
}
module.exports  = {
 passport_local_check_login ,
  //custome_is_auth :custome_is_auth ,
  log_out: logOut,
  sql_auth:custome_is_auth_mysql
};