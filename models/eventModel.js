let mongoose=require("mongoose");
// let AutoIncrement = require('mongoose-sequence')(mongoose);

let eventSchema=new mongoose.Schema({
    _id:Number,
    title:String,
    mainSpeaker:{
        type:Number,
        ref:"users"
    },
    otherSpeakers:[
        {
            type:Number,
            ref:"users"
        } 
    ]
});
// eventSchema.plugin(AutoIncrement, {inc_field: '_id'});
mongoose.model("events",eventSchema);
