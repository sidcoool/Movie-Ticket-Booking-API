const express = require("express")
const app = express()
const bookingRouter = require("./routes/bookingApi")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/bookingApi", bookingRouter)
app.use((req, res) => {
    res.send("<html> <h1><center> 404 Not Found </h1></center> </html>")
})


module.exports = app