
module.exports = (sequelize, Sequelize/*Datatype*/) => {
    
    const SessionSchma  = {
    session_id:{
        type: Sequelize.STRING(128), 
        unique:true,
        primaryKey:true ,
        collate: 'utf8mb4_bin'

    },  

    expires:{
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull:false,
       
        
    },
    data:{
        type: Sequelize.TEXT('medium')+'',
        collate: 'utf8mb4_bin'
     },
   
    }

    
    sequelize.getQueryInterface().createTable("sessions",SessionSchma)//create the table

    const session = sequelize.define("sessions",SessionSchma, 
    //   {
    //     tableName: 'student'
    //   }
      ) 

    return session
}