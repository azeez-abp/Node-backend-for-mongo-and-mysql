module.exports = {
    'MONGO_URI':process.env.MONGO_URI,
    'MYSQL_URI':{'HOST_NAME':process.env.HOST_NAME,
    'USER':process.env.USER,
    'PASSWORD':process.env.PASSWORD,'DB':process.env.DB}
}