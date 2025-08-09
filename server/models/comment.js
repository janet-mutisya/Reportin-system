const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content:{type: String, required:true, trim:true},
    reportedBy:{type:mongoose.Schema.Types.ObjectId, ref:'User', trim:true},
    status:{type:String, enum: ['active', 'deleted'], default:"active"},
},{timestamps:true});

module.exports = mongoose.model("Comment", commentSchema);