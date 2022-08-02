const path     = require('path');
let bcrypt  = require('bcrypt');
const keys  = require('../../../Lib/Config/keys/Key')
let re   = new RegExp(`.+${keys.ROOT_FOLDER}`)
let root  = re.exec(__dirname)? re.exec(__dirname)[0]:__dirname 
let randomStr  = require('./../../../Lib/Fs/RandonString')
//let studentModel= require(path.join(root,'Model','student.json') );

//let fs = require(path.join(root,'Lib','Fs','Fs.js'))
let Register  = (router)=>{
router.get(['/student/register'],(req,res)=>{
    //res.send(`<h2>Student register Area</h2>`)
    res.sendFile(path.join(root, 'view', 'components', 'student', 'register.html') );
})





router.post('/student/post-register',(req,res)=>{
    console.log(req.body)
     const validation_err  = []
     for(let input in  req.body){
       if(req.body[input]===''){
        validation_err.push(`${input}  is required`);
       }
      console.log(req.body[input])
     }

    if(validation_err.length >0){
      return res.json({err:validation_err})
    } 

       
   
    function useMysqlToRegister(){
        let mysqlStudentModel  = require('../../../db/Mysql/SequenlizeDB').tables.student
        mysqlStudentModel.findAll({where:{email:req.body.email} }).then(user=>{
          console.log(user)
           user = user?user.dataValues:null;
            if(!user)  return res.json({err:`user with email ${req.body.email} already regisred`})

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.pass, salt, function(err, hash) {
                  let data = {
                    email : req.body.email,
                    fn: req.body.name,
                    pa:hash,
                    userId:randomStr(64)
                  }  
                
               mysqlStudentModel.create(data).then(user => {
                          
                         return res.json({suc: user.email + ' registered'})
                      })
                      .catch(err => {
                        
                        return  res.json({err: user.email + ' failed to save'})
                      })
                 //console.log(data)
               
                })
            })

        }).catch(err=>{
            console.log(err, " ERRRO OCCURE")
        })
         
    
    }

 

function useMongoToRegister(){
    let mongoStudentModel  = require(path.join(root,'db','Mongo','Mongo'));

    mongoStudentModel.getModel('student').findOne(
        {email:req.body.email},
        //{$or:[{email:req.body.email}, {userId:req.body.email}]}
        (err,user)=>{
         if(err) return  res.json({err:`unknown error occur`})  
         if(user) return res.json({err:`user with email ${req.body.email} already exist`})
         bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.pass, salt, function(err, hash) {
              let data = {
                email : req.body.email,
                fn: req.body.name,
                pa:hash,
                userId:randomStr(64)
              }  
             // console.log(data)
            
              let db  = mongoStudentModel.getModel('student')(data)
               db.save( (err,saved)=>{
                  if(saved){
                    res.json({suc:'data saved'})
                  }else{
                    res.json({err:err})
                  }
               } ) 
            // console.log(data)
           
            })
        })

        }
    )

}  /////////////////end of use mongoToregister
keys.DB_TYPE ==='mongo'?useMongoToRegister():keys.DB_TYPE==='mysql'?useMysqlToRegister():res.json({err:"No database type is registerd in .env file"})





})

}  


module.exports  = Register;