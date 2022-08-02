const express   = require("express");
const uploader   = require("express-fileupload")
const multer  = require('multer')
var formidable = require('formidable');
var fs = require('fs');
const os  = require('os')
const uploads = multer()

const validator = (req,res,next)=>{
     
         err  = []   
         data = null 
         req.files.forEach(file=>{

            //////////////////////
         let  ext =   file.originalname.split(".")[file.originalname.split(".").length-1] ;
         let allowExt  = ['jpeg','jpg','png','gif','docs','doc','xlsx','xlx','docx','txt','pdf','mp4','mp3','ogg','avi','mpeg','zip','blob','vtt','srt','sbv'];
         if(allowExt.indexOf(ext)==-1) {
             let e =  {err:`${ext} is not allow` }
             err.push(e)
            // return fileObject.cb(err,data)
         }
    
         uploaderFileSize  = file.fileSize?file.fileSize:0;
         
         if(file.size >  1024*1024 ) {
            let e = {err:`${file.originalname} size is more that ${uploaderFileSize/(1024*1000)} Mb which   is allow` }
            err.push(e) 
           // return fileObject.cb(err,data)
         } 
    

         //////////////////////////////////////////////////////////////
        })
        
       if(err.length>0){
        return res.json(err)
       }
    
     next()

    //////////////////////////////////////////////////
    
}


const fileValidator  = (file,size)=>{
       
              let err = [];
            //////////////////////
           // file.forEach(file=>{

           
            let  ext =   file.originalname.split(".")[file.originalname.split(".").length-1] ;
            let allowExt  = ['jpeg','jpg','png','gif','docs','doc','xlsx','xlx','docx','txt','pdf','mp4','mp3','ogg','avi','mpeg','zip','blob','vtt','srt','sbv'];
            if(allowExt.indexOf(ext)==-1) {
                let e =  {err:`${ext} is not allow` }
                err.push(e)
               // return fileObject.cb(err,data)
            }
       
            uploaderFileSize  = file.fileSize?file.fileSize:0;
            console.log(file,size)
            if(file.size >  size ) {
               
               let e = {err:`${file.originalname} size is more that ${uploaderFileSize/(1024*1000)} Mb which   is allow` }
               err.push(e)

              // return fileObject.cb(err,data)
            } 
        //})
           console.log(err)
            return err;
   
            //////////////////////////////////////////////////////////////
}






const fileSaver  = (location,size,name_)=>{
   //////////////////////////////////////////////// 
       let images  = [] 
     const storage = multer.diskStorage({
        
        destination: function (req, file, cb) {
           // return true
           cb(null, location)
        },
        filename: function (req, file, cb) {
          
         let ch  =    fileValidator(file,size)  
         if(ch.length>0){
            cb(ch,null)
            return false
         }  
           
          //console.log(ch,"Asdsd")

            if(req.session.img_){

            }else{
              req.session['img_']  = [];  
            }
            
           
          let ext  = file.originalname.split(".")[file.originalname.split(".").length-1]
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          let newName  = file.fieldname + '-' + uniqueSuffix+"."+ext   
          req.session.img_.push(newName) 
          //setTimeout(()=>{fs.unlink(newName)},3000)
          cb(null, newName)
        }
      })
    ////////////////////////////
      const upload = multer({ storage: storage }).array(name_)
      //  upload['limits']  =50000 
     // console.log(upload)
      return upload;
}



const fileUploader  = (req,res,next)=>{
    console.log(req.body)
    return uploader
}

  module.exports  = {fileSaver,fileUploader,validator}