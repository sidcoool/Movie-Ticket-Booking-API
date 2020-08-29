const express = require("express")
const app = express()
const bookingRouter = require("./routes/bookingApi")


app.use(express.json())
app.use("/bookingApi", bookingRouter)

app.listen((3333), () => {
    console.log("Listening to port 3333")
})