const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const randomStr  = require('./../RandonString')

module.exports  = ($path)=>{
        const storage = multer.diskStorage({
            fileFilter: function(req,file,cb){
                cb(null, false)
           },
            
            destination: function(req, file, cb) {
                cb(null, $path);
            },
        
            filename: function(req, file, cb) {
                 let fn  = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
                 let fn2  = randomStr(32)+path.extname(file.originalname)
                 console.log(fn.fn2)
                cb(null, fn2);
            },
           
         

        });   
     
      var upload = multer({ storage: storage })
         return {upload,resizer:sharp}
}

  
