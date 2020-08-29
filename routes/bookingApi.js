const express = require("express")
const router = express.Router()
const mongoFunctions = require("../mongoFunctions")

const convertMins = (d) => {


    return time
    // console.log(time)
}


router.get("/", async (req, res) => {
    let data = await mongoFunctions.getAll()
    res.json(data)
})

router.post("/", async (req, res) => {
    console.log(req.body)

    let d1 = new Date()
    let d2 = new Date(req.body.date + ' ' + req.body.time)

    let diff = (d1 - d2) / (60 * 60 * 1000)
    console.log(diff)
    req.body.timestamp = new Date()

    if (diff > 8) {
        res.json({
            "inserted": "false",
            "msg": "Ticket Expired"
        })
    }
    else {
        let data = await mongoFunctions.addTicket(req.body)
        if (data) {
            res.json({
                "inserted": "true",
                "msg": "Ticket Valid"
            })
        }
        else {
            res.json({
                "inserted": "false",
                "msg": "Error occured"
            })
        }
    }
})

router.patch("/:id", async (req, res) => {
    let data = await mongoFunctions.updateTicket(req.params.id, req.body)
    // console.log(data.result.n)
    if (data && data.result.n) {
        res.json({ "updated": "true" })
    }
    else {
        res.json({
            "updated": "false",
            "msg": "ID not found"
        })
    }
})

module.exports = router
