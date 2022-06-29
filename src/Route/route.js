const express = require("express")
const router = express.Router()


const collegeController = require("../Controller/collegeController")
const internController = require("../Controller/internController")





router.post("/functionup/colleges",collegeController.createCollege)
router.post("/functionup/interns",internController.createInterns)

module.exports = router