const { student } = require("../../Mongo/AllTables")

module.exports = (sequelize, Sequelize) => {
    
    const StudentSchma  = {
    id:{
      type: Sequelize.BIGINT(50), 
      unique:true,
      primaryKey:true,
      autoIncrement: true
       },    
    userId:{type: Sequelize.STRING,
      unique:true,required:true
    },
    regId:{type: Sequelize.STRING},
    fn: {type: Sequelize.STRING,required:true},
    mn: {type: Sequelize.STRING,required:true},
    ln: {type: Sequelize.STRING,required:true},
    email: {type: Sequelize.STRING,required:true,unique:true,},
    ge:{type: Sequelize.STRING},
    dep:{type: Sequelize.STRING},
    pa: {type: Sequelize.STRING,required:true},
    date:{type: Sequelize.STRING,default:Date.now},
    createdAt:{ type: "TIMESTAMP", defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),allowNull: false,},
    updatedAt:{ type: "TIMESTAMP",defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),allowNull: false,},
    profile_img:{type: Sequelize.STRING},
    ad: {type: Sequelize.STRING(1234)},
    sa:{type: Sequelize.STRING},
    ha: {type: Sequelize.STRING},
    pn:{type: Sequelize.STRING},
    activityToken:{type: Sequelize.STRING},
    sessionToken:{type: Sequelize.STRING},
    sessionTime:{type: Sequelize.STRING},
    cookieToken:{type: Sequelize.STRING},
    cookieTime:{type: Sequelize.STRING},
    isRemember:{type: Sequelize.INTEGER,default:0}, 
   
    cl:{type: Sequelize.STRING}
    }

    
    sequelize.getQueryInterface().createTable("student",StudentSchma)//create the table

    const Student = sequelize.define("student",StudentSchma, 
    //   {
    //     tableName: 'student'
    //   }
      ) 

    //student.sync()  

    return Student
}