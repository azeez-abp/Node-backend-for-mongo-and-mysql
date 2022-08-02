const path     = require('path');
const root_folder  = require('../../../Lib/Config/keys/Key').ROOT_FOLDER
let re   = new RegExp(`.+${root_folder}`)
let root  = re.exec(__dirname)? re.exec(__dirname)[0]:__dirname 
let cookie_name  = process.env.COOKIE_NAME
 
 let studentModel= require(path.join(root,'Model','student.json') );
 require('dotenv').config()///all in process.env
 let jwt  = require('jsonwebtoken');
 let fs = require(path.join(root,'Lib','Fs','Fs.js'))
//  console.log(__dirname);
//  console.log(root);
let Logout  = (router)=>{
   router.get('/student/logout',(req,res)=>{      
       let cookies  = req.cookies
       if(!cookies?.[cookie_name ]) return res.sendStatus(401)
       let reToken= cookies[cookie_name];
     //  let user   = {...req.body,user:req.body.email,pass:req.body.pass}
       let userDetails  =studentModel.find(data=>data.refresh_token===reToken[cookie_name]);
        delete userDetails.refresh_token

      // let otherUser  = studentModel.filter(users=>users.email !=  user.email )  ;
       //  console.log(otherUser,req.body);
        if(!userDetails){
          res.clearCookie(cookie_name ,{httpOnly:true,sameSite:'None',secure:true  })
         return res.sendStatus(204)
        } 

        let otherUser  = studentModel.filter(users=>users.email !=  userDetails.email )  ;
        let allUsers  = [...otherUser,userDetails];
        fs.add(path.join(root,'Model','student.json'),JSON.stringify(allUsers)  );
        res.clearCookie(cookie_name ,{httpOnly:true,sameSite:'None',secure:true })
     //   return res.sendStatus(204)
        res.redirect('/student/login')
        
      })

    }  
    

 

module.exports  = Logout; // res.json({user:userDetails });  
        