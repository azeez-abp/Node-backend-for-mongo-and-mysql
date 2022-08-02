require('dotenv').config();
//console.log(process.env.MONGO_LIVE )
module.exports = {
    'MONGO_URI':process.env.MONGO_LIVE_2,

    'MYSQL_URI':{
        'host':process.env.MYSQL_LOCAL_HOST,
        'user':process.env.MYSQL_LOCAL_USER,
        'password':process.env.MYSQL_LOCAL_PASS,
        'database':process.env.MYSQL_LOCAL_DB
     },
    'COOKIE_NAME':process.env.COOKIE_NAME,
    'ACCESS_TOKEN':process.env.ACCESS_TOKEN,
    'REFRESH_TOKEN':process.env.REFRESH_TOKEN,
    'SESSION_NAME':process.env.SESSION_NAME,
    'SESSION_TOKEN':process.env.SESSION_TOKEN,

    'ROOT_FOLDER':'nodemc',
    'DB_TYPE':process.env.DB_TYPE
}