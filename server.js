const express  = require('express');
const app    = express();
const router  = express.Router();
const path  = require('path');
const cors  = require('cors');
const session = require('express-session')
const cookie_parser  =require('cookie-parser')  
const passport  =require('passport') 
let PORT   = process.env.PORT || 7000


var whitelist = [
'http://example1.com', 
'http://example2.com', 
'http://127.0.0.1:7000',
'127.0.0.1:7000',
'localhost:7000'
//undefined
]
var corsOptions = {
  origin: function (origin, callback) {
    
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionSuccessStatus:200
}

corsOptionsDelegate = function (req, callback) {
  var corsOptions;
 // console.log(req.headers['host'],"tyu")
  if (whitelist.indexOf(req.header('host')) !== -1) {
    //corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    throw new Error("Rejection by cors")
    //corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options

}

//console.log(module)
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cors(corsOptionsDelegate ));
app.use(require(path.join(__dirname,'Middleware','HeaderOption')))
app.use(cookie_parser());
app.use(express.static(path.join(__dirname,'/public')))
//the order is important
app.use(passport.initialize());
app.use(require('./Lib/Config/session/Session').session())

/// initalize passport to make stragy work
//app.use(passport.session());
//studentComponent(app)  
app.use((req,res,next)=>{
  console.log(req.session)
  console.log(req.user)////passport-local user
  console.log(req.logout)
  next()
})

require('./Controllers/Student/Route')(app) 
/// app.post(''require('./Controllers/Student/Route/RefrehToken') )
 console.log( )  ;

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'view', 'index.html') );
}) 

app.get('/man',(req,res)=>{
    res.sendFile( './view/index.html',{root:__dirname} );
})


app.get('/*',(req,res)=>{
    res.send(`<h1>404 File not file</h1>`)
})


let http = require('http');
let fs  = require('fs');
const { initialize } = require('passport');

require('./Lib/Fs/uploader/FileUploder')(app,'/api/fileupload','public/images',false,true,false,{s:2000,w:3000,h:200});

let server  = http.createServer((req,res)=>{
    console.log(req.STATUS_CODE)
    //ontent type
    // file to render 
    // url
})




app.listen(PORT,()=>{
    console.log('127.0.0.1:'+PORT  );
})

//alt z wrap text in vitual studeo code