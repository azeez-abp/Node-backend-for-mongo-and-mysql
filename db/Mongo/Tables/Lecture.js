const schema = {
    lectureId:{type:String},
    lectureSubject: {type:String,required:true},
    lectureTitle: {type:String,required:true},
    teacherId: {type:String,required:true},
    lectureClass:{type:String},
    lectureDep:{type:Object},
    lectureDate:{type:String},
    created_at:{type:String},
    updated_at:{type:String},
    lectureData:{type:String},
    lectureExcercise: {type:Object},
    id:{type:Number,unique:true},
    lectureAddedBy:{type:String},
    lectureUpdatedBy: {type:Object}
}
module.exports  = schema;
