const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
{
    fullName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    mobile:{
        type:String
    },

    organization:String,

    designation:String,

    profilePhoto:String,

    isVerified:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Author",AuthorSchema);