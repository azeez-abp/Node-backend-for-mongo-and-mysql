const crypto = require('crypto');
const fs     = require('fs');

function genKeyPair(){
    const keyPair =  crypto.generateKeyPairSync('rsa',
      {  
          modulusLength:4096,
    
         publicKeyEncoding :{
             type :"pkcs1",
             format:"pem"
         },
         privateKeyEncoding :{
            type :"pkcs1",
            format:"pem"
        }
    })
    //__dirname current dir 
//console.log(keyPair.privateKey)
 fs.writeFileSync(__dirname+'/id_rsa_public.perm' , keyPair.publicKey) 
 fs.writeFileSync(__dirname+'/id_rsa_private.perm' , keyPair.privateKey) 
}

module.exports = genKeyPair;