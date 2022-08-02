
const schema = {
    lastModified:{type:String},
    expires :{type:String},
    rememeber:{type:Number,default:0}, 
    user_id:{type:String,unique:true},
    cookie_id:{type:String,unique:true},
    session:{type:Object},
}

module.exports  = schema;