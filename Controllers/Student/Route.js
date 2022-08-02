// const express  = require('express');
// const router     = express.Router();
// const path     = require('path');

let Student = (router)=>{
    
    require('./Route/Login')(router)
    require('./Route/Register')(router) 
    require('./Route/Dashboard')(router)     
}  

module.exports  = Student