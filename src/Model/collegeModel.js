const mongoose = require("mongoose");

const collegeModel = new mongoose.Schema({
     name: { 
         type : String,
         required: "Name is required",
         unique: true,
         trim: true
       }, 

    fullName: {
        type: String,
         required: "Full Name is required",
         trim: true
     },

     logoLink: {
        type: String,
        required: "logoLink is required"

     },

      isDeleted: {
        type:Boolean, 
        default: false} 

}, {timestamps: true })

module.exports = mongoose.model("College", collegeModel)

