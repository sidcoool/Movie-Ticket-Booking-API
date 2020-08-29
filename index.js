const express = require("express")
const app = express()
const bookingRouter = require("./routes/bookingApi")


app.use(express.json())
app.use("/bookingApi", bookingRouter)
app.use((req, res) => {
    res.send("<html> <h1><center> 404 Not Found </h1></center> </html>")
})

app.listen((3333), () => {
    console.log("Listening to port 3333")
})