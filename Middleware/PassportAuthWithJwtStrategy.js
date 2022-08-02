var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    keys  = require('./../Lib/Config/keys/Key');
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.ACCESS_TOKEN;
//console.log( process.env.ACCESS_TOKEN_SECRET)
opts.algorithms ="HS256"
/////////Note: this is validator, JWt_payload is set by you in jwt.sign method
///call the function pass passport
//.passport-local for implementing local strategy, and passport-jwt for retrieving and verifying JWTs.
module.exports = (passport,userTable,table)=>{
   passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
       console.log(userTable,userTable(table),opts,"tablt")
    userTable.find({$or:[{userId: jwt_payload.id},{email: jwt_payload.email}] } , function(err, user) {
           console.log(user," user")
      
        if (user) {
            let userData = {userId:user.userId,email:user.email}
        //  console.log(user,userData,"call")
            return done(null, userData);
        } else {
            //console.log(opts,jwt_payload,this)
            return done(null, {err:"Unauth"});
            // or you could create a new account
        }
    });
    
}) );

}