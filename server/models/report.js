const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    status:{type: String, enum: ['open', 'in-progress', 'resolved'],
        default:"open"
    },
    recordStatus:{type:String, enum: ['active', 'deleted'], default:"active"},
    reportedBy:{type: mongoose.Schema.Types.ObjectId, required:true, trim:true, ref:"User"},
    sicksheet:{type:String},
},{timestamps:true});

module.exports = mongoose.model("Report", reportSchema);