let mongoose=require("mongoose");
let AutoIncrement = require('mongoose-sequence')(mongoose);


//1- create schema
let usersSchema=new mongoose.Schema({
    _id:Number,
    name:String,
    userName : String,
    password : String,
    mail : String,
    age:{type:Number,min:20,max:50},
    avatar : {type : String},
});

usersSchema.plugin(AutoIncrement, {inc_field: '_id'});
mongoose.model("users",usersSchema );