const internModel = require("../Model/internModel")
const collegeModel = require("../Model/collegeModel")
const isBodyExist = function (data) {
    return Object.keys(data).length > 0
}

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
};

const validateEmail = function (mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
};

const validateMobile = function(number) {
    if(/^[0-9]+$/.test(number)) return true
}

const regex = /\d/;
const isVerifyString = function (string) {
    return regex.test(string)
};

const createInterns = async function (req, res) {
    try {

        let data = req.body
        if (!isBodyExist(data)) {
            return res.status(400).send({ status: false, message: "Body can't be empty" })
        }
        Object.keys(data).forEach(x => data[x]=data[x].trim())
        //validation for key should exist
        if (!data.name) return res.status(400).send({ status: false, msg: "name is required" })
        if (!data.email) return res.status(400).send({ status: false, msg: "email is required" })
        if (!data.mobile) return res.status(400).send({ status: false, msg: "mobile is required" })
        if (!data.collegeName) return res.status(400).send({ status: false, msg: "collegeId is required" })

        //validation for invalid or empty data
        if (!isValid(data.name)) return res.status(400).send({ status: false, message: "invalid name" })
        if (!isValid(data.email)) return res.status(400).send({ status: false, message: "invalid email " })
        if (!isValid(data.mobile)) return res.status(400).send({ status: false, message: "invalid mobile number" })
        if (!isValid(data.collegeName)) return res.status(400).send({ status: false, message: "invalid collegeName" })

        //validation for name containing digits
        if (isVerifyString(data.name)) return res.status(400).send({ status: false, message: "name can not contain digits" })

        //validation for unique email and email structure
        if(await internModel.findOne({email:data.email})){
            return res.status(400).send({status:false, message:"Email already exists. Please give another one"})
        }
        if(!validateEmail(data.email)) return res.status(400).send({status:false, message:"emailId is not valid"})

        //validation for mobile number length and unique number
    
        if(!validateMobile(data.mobile.trim())) return res.status(400).send({status:false, message:"mobile can't contain albhabets"})
        if(data.mobile.length!=10){
            return res.status(400).send({status:false,message:"Number should be of 10 digits"})
        }
        if(await internModel.findOne({mobile:data.mobile})){
            return res.status(400).send({status:false, message:"Mobile number already exists. Please give another one"})
        }
        
        //
        let collegeData = await collegeModel.findOne({name:data.collegeName})
        if(!collegeData) return res.status(404).send({status:false,message:`${data.collegeName} doesn't exist`})

        data.collegeId = collegeData.id
        delete data.collegeName
       
        let college = await internModel.create(data)
        res.status(201).send({ status: true, data: college })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


module.exports.createInterns = createInterns
