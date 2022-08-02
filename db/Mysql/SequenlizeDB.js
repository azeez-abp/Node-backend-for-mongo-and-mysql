const  {Sequelize,Model,DataTypes}   =    require('sequelize')
const key  = require('../../Lib/Config/keys/Key').MYSQL_URI
//console.log(key)
let dbConfig = {
    HOST: key.host,
    USER: key.user,
    PASSWORD: key.password,
    DB: key.database,
    dialect: "mysql",
    //define: { "charset": "utf8", "dialectOptions": { "collate": "utf8_general_ci" } },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

try{
    const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
      define: {
        timestamps: true,
        freezeTableName: true
      },
      
     // operatorsAliases: false,
      pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
      }
    });
    const db = {};
    //sequelize.getQueryInterface().createDatabase('portal')
    db.Sequelize = Sequelize;/////module
    db.sequelize = sequelize;////db
    // studentTableSchema(sequelize,Sequelize)
    module.exports = {
    tables:{
      student:require('./Tables/Student')(sequelize,Sequelize),
      sessions:require('./Tables/Session')(sequelize,Sequelize)

    }
  }
  }catch (err){
    console.log(err)
  }