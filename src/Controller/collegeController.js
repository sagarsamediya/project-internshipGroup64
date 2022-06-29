const collegeModel = require("../Model/collegeModel")
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

const createCollege = async function (req, res) {
    try {
      const data = req.body;
  
      // Body Validation
  
      if (!isBodyExist(data)) {  return res  .status(400) .send({ status: false, message: "Please provide college details" }); }
  
      // Destructuring body
  
       const { name, fullName, logoLink } = data;

      if (!data.name) return res.status(400).send({ status: false, message: "name is required" })
      if (!data.fullName) return res.status(400).send({ status: false, message: "fullName is required" })
      if (!data.logoLink) return res.status(400).send({ status: false, message: "logoLink is required" })
  
      // Validation Starts
      if (!isValid(name)) return res.status(400).send({ status: false, message: "Please provide valid college name" });
      
  
      let checkName = await collegeModel.findOne({ name: data.name })
              if (checkName) return res.status(400).send({ msg: "College Name already exist" })
  
      if (!isValid(fullName)) {return res.status(400).send({status: false, message: "Please provide valid fullName of the college",});
      
    }
  
      if (!isValid(logoLink)) { return res.status(400).send({ status: false, message: "Please provide valid url" });
      
    }

      // Creating College

    const college = await collegeModel.create(data);

    res.status(201).send({ status: true, message: "College successfully created", data: college });

  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}

// ----------------------**-----------college details-------------------------***---------------------------------------**--------------

const collegeDetails = async function(req, res) {
    try{
        let collegeName = req.query

        


    }catch(err){
        console.log(err)
        res.status(500).send({status: false , msg: "err message"})
    }
}

module.exports.createCollege = createCollege