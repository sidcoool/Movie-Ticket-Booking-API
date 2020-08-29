const { MongoClient, ObjectID } = require('mongodb')
const uri = "mongodb+srv://sid:booking_123@cluster0.gopwg.mongodb.net/ticketBooking?retryWrites=true&w=majority"
const Client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true})

exports.getAll = async function getAll() {
    try {
        const client = await Client.connect()
        const col = client.db("ticketBooking").collection("tickets")
        let data = await col.find().toArray()
        return data 
    }
    catch (e) {
        console.error(e)
    }

}

exports.getTicket = async function getTicket(id) {
    try {
        const client = await Client.connect()
        const col = client.db("ticketBooking").collection("tickets")
        let data = await col.find({_id : new ObjectID(id)}).toArray()
        return data 
    }
    catch (e) {
        console.error(e)
    }
}

exports.getTicketsByTime = async function getTicketsByTime(timing) {
    try {
        const client = await Client.connect()
        const col = client.db("ticketBooking").collection("tickets")
        let data = await col.find({date: timing.date, time: timing.time}).toArray()
        return data 
    }
    catch (e) {
        console.error(e)
    }
}

exports.addTicket = async function addTicket(ticket) {
    try {
        const client = await Client.connect()
        const col = client.db("ticketBooking").collection("tickets")
        let data = await col.insertOne(ticket)
        return data 
    }
    catch (e) {
        console.error(e)
    }
}


exports.updateTicket = async function updateTicket(id, ticket) {
    try {
        const client = await Client.connect()
        const col = client.db("ticketBooking").collection("tickets")
        let data = await col.updateOne({_id : new ObjectID(id)},
        {$set: ticket})
        return data 
    }
    catch (e) {
        console.error(e)
    }

}

exports.deleteTicket = async function deleteTicket(id) {
    try {
        const client = await Client.connect()
        const col = client.db("ticketBooking").collection("tickets")
        let data = await col.remove({_id : new ObjectID(id)})
        return data 
    }
    catch (e) {
        console.error(e)
    }
}


