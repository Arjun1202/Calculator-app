const mongoose=require('mongoose');

const calcSchema=new mongoose.Schema(
{
    expression:
    {
    type:String,
    required:true
    },
    result:
    {
    type:String,
    required:true
    }
})


module.exports=mongoose.model("calculations",calcSchema);