const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const PostSchema=new Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
    },
    postCategory:{
type:String,
require:true
    },
    img:{
        type:String,
    }
});

module.exports=mongoose.model("posts",PostSchema)