import mongoose from "mongoose";

const LinkSchema= mongoose.Schema({
originalUrl:{type:String, required:true},
alias: { type: String, required: true },
clicks:[{
    insertedAt:{type:Date,required:true},
       ipAdress:{type:String,required:true}}]
})

export default mongoose.model('links',LinkSchema)