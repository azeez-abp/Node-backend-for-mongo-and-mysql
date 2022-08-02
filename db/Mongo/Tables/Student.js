
const schema = {

    userId:{type:String},
  //  regId:{type:String},
    fn: {type:String,required:true},
    // mn: {type:String,required:true},
    // ln: {type:String,required:true},
    email: {type:String,required:true},
    ge:{type:String},
    dep:{type:String},
    pa: {type:String,required:true},
    //pa2: {type:String,required:true},
    date:{type:String,default:Date.now},
    created_at:{type:String},
    updated_at:{type:String},
    profile_img:{type:String},
    ad: {type:Object},
    sa:{type:String},
    ha: {type:String},
    pn:{type:String},
    activityToken:{type:String},
    sessionToken:{type:String},
    sessionTime:{type:String},
    cookieToken:{type:String},
    cookieTime:{type:String},
    isRemember:{type:Number,default:0}, 
    id:{type:Number,unique:true},
    cl:{type:String},
  
}
module.exports  = schema;





