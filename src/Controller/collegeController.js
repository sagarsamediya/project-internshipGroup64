const collegeModel = require("../Model/collegeModel")
const isBodyExist = function(data){
   return Object.keys(data).length>0
}

const isEmpty = function(data){
    if(data!=" ") return false
    else return true
}
const createCollege = async function(req,res){
    try{
        
        let data = req.body
        if(!isBodyExist(data)){
           return  res.status(400).send({status:false,message:"Body can't be empty"})
        }
        if(!isEmpty(data.name)){
            return  res.status(400).send({status:false,message:"name can't be empty"})
        }
        if(!isEmpty(data.fullName)){
            return  res.status(400).send({status:false,message:"full Name can't be empty"})
        }
        if(!isEmpty(data.logoLink)){
            return  res.status(400).send({status:false,message:"link can't be empty"})
        }

    let college = await collegeModel.create(data)
    res.status(201).send({status:true,data:college})
}catch(err){
    res.status(500).send({status:false,message:err.message})
}
}


module.exports.createCollege = createCollege