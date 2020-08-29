const express = require("express")
const router = express.Router()
const mongoFunctions = require("../mongoFunctions")


router.get("/", async(req, res)=>{
    res.send("on page")
})

router.post("/", async (req, res) => {
    console.log(req.body)
    let data = await mongoFunctions.addTicket(req.body)
    // console.log(data)
    if (data) {
        res.json({ "inserted": "true" })
    }
    else {
       res.json({ "inserted": "false" })
    }
})

module.exports = router
