let mongoose=require("mongoose");

//1- create schema
let speakerSchema=new mongoose.Schema({
    _id:Number,
    name:String,
    age:{type:Number,min:20,max:50}
});

//2- mapping
                //collection  //schemaObject
mongoose.model("speakers",speakerSchema );