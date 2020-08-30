const express = require("express")
const router = express.Router()
const mongoFunctions = require("../mongoFunctions")



router.get("/", async (req, res) => {
    let data = await mongoFunctions.getAll()
    res.json(data)
})


router.get("/:id", async (req, res, next) => {
    if (req.params.id == "timing" || isNaN(req.params.id)) {
        next()
    }
    else {
        let data = await mongoFunctions.getTicket(req.params.id)

        if (!data) {
            res.json({
                "msg": "Error Occured (Invalid ID)" 
            })
        }
        else if (data.length == 1) {
            res.json(data)
        }
        else if (data.length == 0) {
            res.json({
                "msg": "No Ticket Found"
            })
        }
    }

})

router.get("/timing", async (req, res) => {
    console.log(req.query)
    // res.send("sdq")
    let data = await mongoFunctions.getTicketsByTime(req.query)

    if (!data) {
        res.json({
            "msg": "Error Occured"
        })
    }
    else if (data.length > 0) {
        res.json(data)
    }
    else if (data.length == 0) {
        res.json({
            "msg": "No Ticket Found"
        })
    }
})

router.post("/", async (req, res) => {
    console.log(req.body)

    let d1 = new Date()
    let d2 = new Date(req.body.date + ' ' + req.body.time)

    let diff = (d1 - d2) / (60 * 60 * 1000)
    console.log(diff)
    req.body.timestamp = d1

    if (diff > 8) {
        res.json({
            "inserted": "false",
            "msg": "Ticket Expired"
        })
    }
    else {
        req.body.expireAt = new Date(d1.getTime() + ((8-diff)*60*60*1000))

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
    else if (data.result.n == 0) {
        res.json({
            "updated": "false",
            "msg": "ID not found"
        })
    }
    else {
        res.json({
            "updated": "false",
            "msg": "Error Occured"
        })
    }
})


router.delete("/:id", async (req, res) => {

    let data = await mongoFunctions.deleteTicket(req.params.id)
    // console.log(data)
    if (data && data.result.n) {
        res.json({ "deleted": "true" })
    }
    else if (data.result.n == 0) {
        res.json({
            "deleted": "false",
            "msg": "ID not found"
        })
    }
    else {
        res.json({
            "deleted": "false",
            "msg": "Error Occured"
        })
    }
})

router.use((req, res) => {
    res.send("<html> <h1><center> 404 Not Found </h1></center> </html>")
})


module.exports = router
