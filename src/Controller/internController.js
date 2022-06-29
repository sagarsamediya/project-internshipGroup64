const internModel = require("../Model/internModel")

const isBodyExist = function(data){
    return Object.keys(data).length>0
};

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
};


const createIntern = async function (req, res){
    try{
        let data = req.body
        if(!isBodyExist(data)){
            return  res.status(400).send({status:false,message:"Body can't be empty"})
         }
 
    }catch(err){
          console.log(err)
          res.status(500).send({status: false , msg: "err message"})
    }
}