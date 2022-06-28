const express = require("express")
const router = express.Router()


const collegeController = require("../Controller/collegeController")




router.post("/functionup/colleges",collegeController.createCollege)

module.exports = router