const express = require("express")
const router = express.Router()
// const mongoFunctions = require("../mongoFunctions")

router.post("/", async (req, res) => {

    console.log(req.body)
    res.send("got it")
    
})

module.exports = router
