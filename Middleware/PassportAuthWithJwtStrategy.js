var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    keys  = require('./../Lib/Config/keys/Key');
var opts = {}

const Key = require('../Lib/Config/keys/Key');
const passport = require('passport')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = keys.ACCESS_TOKEN;
opts.ignoreExpiration  = false
 opts.passReqToCallback =false
 /*option affect the functionality jwt*/
// opts.issuer  = 'abp'
// opts.audience = 'user id'

// opts.jsonWebTokenOptions = {
// complete :false,
// clockTolerance: '',
// maxAge:'2h',
// clockTimestamp:'100',
// nonce:'OpenId String'
// }
//
//opts.algorithms ="HS256"
/////////Note: this is validator, JWt_payload is set by you in jwt.sign method
///call the function pass passport
//.passport-local for implementing local strategy, and passport-jwt for retrieving and verifying JWTs.



 //
/// require this on the page where you call passport.authenticate   
const authe   = (table)=>{
         passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
            console.log(jwt_payload)
           table.findOne({where:{userId:jwt_payload.user}}, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
        }))
}
 

const jsw_passport_auth_mysql  = ()=>{
         
            return (table)=>{  
                 function getUser (payload,done){
//    console.log
//    (payload,"=========================================================================================================")
                    table.findOne({
                        where:{
                        userId:payload.user
                        }
                    }).then(user=> {
                        if (user) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                            // or you could create a new account
                        }
                    }).catch(err=>{
                        if (err) {
                            return done(err, false);
                        }
                    })
        
                }
               
                console.log("=========================================================================================================")  
                   
        //////////////////////////////////////////////////////////////////////one
        /////////////////////////////////////////////////////////////////////two
        
   passport.use( new JwtStrategy( opts, getUser))
      
    // passport.serializeUser(function(user, done) {
    //     console.log('serialized: ', user);       //logged when credentials matched.
    //   return done(null, user.userId);
    // });
  
    // passport.deserializeUser(function(id, done) {
    //   db.findOne(id, function(err, user) {
    //       console.log('deserialized');
  
    //     return done(null, user.userId);
    //   });
    // });

   } ////end of function return

   
 }



const jsw_passport_auth_mongo = ()=>{
    return (passport,table)=>{
    const useMysqlToLoginJwT2  = (jwt_payload,done)=>{
        table.find({userId: jwt_payload.user}  , function(err, user) {  
         if (user) {
             let userData = {userId:user.userId,email:user.email}
              return done(null, userData);
         } else {
             //
             return done(null, {err:"Unauth"});
             // or you could create a new account
         }
     });

    }

   return passport.use(new JwtStrategy(opts,useMysqlToLoginJwT2))
}

}



/////////////////////////////////////////////////
let login  = null
if( Key.DB_TYPE=='mongo'){
   login = jsw_passport_auth_mongo
   //login = jsw_passport_auth_mysql
}
if( Key.DB_TYPE=='mysql'){
    login = jsw_passport_auth_mysql
}

module.exports  = {auth:login,authe
}

