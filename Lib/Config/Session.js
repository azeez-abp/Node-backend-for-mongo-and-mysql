  let path   = require('path');
  let root  = __dirname.match(/.+web-app/)[0]

let option  = {
    secret: process.env.SESSION_TOKEN,
    resave: false,
    saveUninitialized: true,
    cookie: require(path.join(root,'Lib','Config','Cookie.js'))
  }

  module.exports = option