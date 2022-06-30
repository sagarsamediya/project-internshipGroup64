const collegeModel = require("../Model/collegeModel")
const internModel = require("../Model/internModel")

const isBodyExist = function (data) {
    return Object.keys(data).length > 0
}

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
};


const regex = /\d/;
const isVerifyString = function (string) {
    return regex.test(string)
};


//<=================================create College============================>

const createCollege = async function (req, res) {
    try {
        const data = req.body;
      
        // // Body Validation
        if (!isBodyExist(data)) {return res.status(400).send({ status: false, message: "Please provide college details" });}

        // Destructuring body
        const { name, fullName, logoLink } = data;
        data.name= (data.name).toUpperCase()
        


   

        if (!data.name) return res.status(400).send({ status: false, message: "name is required" })
        if (!data.fullName) return res.status(400).send({ status: false, message: "fullName is required" })
        if (!data.logoLink) return res.status(400).send({ status: false, message: "logoLink is required" })

        // Validation Starts

        if (!isValid(data.name)) {return res.status(400).send({ status: false, message: "Please provide valid college name" });}
       
        //checking for name and fullname must be string
        if(isVerifyString(data.name)) return res.status(400).send({status:false, message:"name can't contain numbers"})
        if(isVerifyString(data.fullName)) return res.status(400).send({status:false, message:"full name can't contain numbers"})

        //is college Name is already present in collection
        let checkName = await collegeModel.findOne({ name: data.name })
        if (checkName) return res.status(400).send({ status:false,message: "College Name already exist" })

        if (!isValid(fullName)) {return res.status(400).send({status: false,message: "Please provide valid fullName of the college",});}

        if (!isValid(logoLink)) {return res.status(400).send({ status: false, message: "Please provide valid url" });}

        // Creating the College 


        const college = await collegeModel.create(data);

        res.status(201).send({
            status: true,
            message: "College successfully created",
            data: college,
        });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}



//============================show Interns details======================================


const getAllInterns = async function (req, res) {

    try {
        let data = req.query
        
        if(Object.keys(data).length===0) return res.status(404).send({status:false,message:"college name is not given"})

        if(!isValid(data.collegeName)) return res.status(400).send({status:false,message:"college name can't be empty"})


      //finding the college in the database collection by collegeName
        let college = await collegeModel.findOne({ name: data.collegeName,isDeleted:false })
        if(!college) return res.status(404).send({status:false,message:"No such college exists"})

      //finding the interns in the college by CollegeId 
        let allInters = await internModel.find({collegeId:college._id,isDeleted:false}).select({_id:1,name:1,email:1,mobile:1})
        if(allInters.length===0) return res.status(404).send({status:false,message:"No interns in this college"})

        //return the college details along with the interns details in the responce

        let InternsInCollege = {
            "name": college.name,
            "fullName": college.fullName,
            "logoLink": college.logoLink,
            "interns": allInters
        }

        res.status(200).send({status:true,data:InternsInCollege})
    }
    catch (err) {
        res.send(err.message)
    }

}


module.exports.createCollege = createCollege
module.exports.getAllInterns = getAllInterns