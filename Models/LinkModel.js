import mongoose from "mongoose";

const LinkSchema= mongoose.Schema({
originalUrl:{type:String, required:true},
alias: { type: String, required: true },
targetParamName:{type:String,required:true},
targetValues:[{
    name:{type:String,required:true},
    value:{type:String,required:true}
}],
clicks:[{
    insertedAt:{type:Date,default:Date.now},
       ipAdress:{type:String,required:true},
    targetParamValue:{type:String}}]
})

export default mongoose.model('links',LinkSchema)