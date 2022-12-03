
let Admin = (router)=>{
    require('./Route/Login')(router)
    require('./Route/Profile')(router)
}  

module.exports  = Admin
