const passport = require('passport')

let mysqlTable  = require('../../../db/Mysql/SequenlizeDB').tables.admin

//passportjwt.auth()(passport,mysqlTable)///json webtokn function that return the verifier
//passportjwt.authe(mysqlTable)
//passportjwt(mysqlTable)
// require('./../../../Middleware/PassportAuthWithJwtStrategy').auth()(mysqlTable)///jwt startegy
require('./../../../Middleware/PassportAuthWithLocalStrategy')(mysqlTable)
let Profile  = (router)=>{
router.post('/admin/profile', 
//passport.authenticate('jwt', { session: false }),
passport.authenticate('local', /*{  failureRedirect: '/login' }*/ ),
(req, res)=> {
    res.json({user:req.user});},

)
}

module.exports  = Profile; // res.json({user:userDetails });  
 