var bcrypt = require('bcryptjs');
const  crypto  = require('crypto');


function genPasswordCryptoBase(password){
     let salt  = crypto.randomBytes(64).toString('hex')
     let hashPass  = crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex')
    return {
             salt:salt,
             hashPass:hashPass
     }
}

function checkCryptoPassword(password,hashedPaswordFromDb,saltFromDb){
    //console.log(password)
    let verify  = crypto.pbkdf2Sync(password,saltFromDb,1000,64,'sha512').toString('hex');
     //  console.log(verify===hashedPaswordFromDb)
      if( verify === hashedPaswordFromDb){
              return  true 
      }else{
        return false
      }
}
function generateHashPassword(password, saltLen=32,cb){
    let pa  = [];
 bcrypt.genSalt(saltLen, function(err, salt) {
    
    bcrypt.hash(password, salt, function(err, hash) {
        if(err){
            
            return false
        }else{
            pa[0]=hash
           cb(hash);  
              //
        }
  
   
    });
});   //
//return cb
}


function checkPassword(password,hash){
    // Load hash from your password DB.
bcrypt.compare(password, hash, function(err, isMatch) {
    // res === true
       if(err || !isMatch){
           return false;
       }else{
           return true;
       }
});

}


module.exports =  {
   genPass : generateHashPassword,
   checkPass :checkPassword,
   genPasswordCryptoBase:genPasswordCryptoBase,
   checkCryptoPassword:checkCryptoPassword
}