const fs  = require("fs")
//require("./CryptoGen")()///genrate public and private key
let enc  = require("./ContentEncrytor")
let pk  = fs.readFileSync(__dirname+'/cypto/id_rsa_public.perm','utf8');
let pvk  = fs.readFileSync(__dirname+'/cypto/id_rsa_private.perm','utf8');
// console.log(pk)
let encryMsg = enc.publicEncrypt(pk,JSON.stringify ({name:"Azeez",amount:400000,message:"This cryptoo hide content of message"}) ).encrypted.toString()
let dncryMsg  = enc.decryptWithPrivateKey(pvk,  encryMsg).decryptor.toString()