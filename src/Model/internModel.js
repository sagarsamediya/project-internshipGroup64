const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId
const internModel = new mongoose.Schema({
     name: {
        type: String,
        required: "Name is required",
        trim: true,
    },

     email: {
        type: String,
        required: "Email is required",
        unquie: true
    },

      mobile: {
        type: String,
        required: "Email is required",
        unquie: true
      }, 

      collegeId: {
       type: ObjectId ,
        ref: "College", 
        required: "Object Id is required"

      },
        isDeleted: { 
          type:Boolean, 
         default: false
      },

}, {timestamps: true })

module.exports = mongoose.model("intern", internModel)