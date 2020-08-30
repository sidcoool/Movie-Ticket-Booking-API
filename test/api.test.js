const mocha = require("mocha")
const expect = require("chai").expect
const request = require("request")

const app = require("../index")
let server

describe("apiTest", () => {

    before((done) => {
        server = app.listen(3333, done)
    })

    it("get random route", (done) => {
        request.get("http://localhost:3333/random", (err,res,body) => {
            console.log(typeof(body))
            console.log(body)
            expect(body).to.equal("<html> <h1><center> 404 Not Found </h1></center> </html>")
            done()
        })
    })

    it("get ticket by id", (done) => {
        request.get("http://localhost:3333/bookingApi/5f4b5bd41bf46c37da3961f1", (err, res, body) => {
            body = JSON.parse(body)
            // console.log(typeof(body))

            expect(body).to.be.a('Array')

            expect(Object.keys(body[0]).length).to.equal(7)

            expect(body[0]).to.have.property('name')
            expect(body[0]).to.have.property('_id')
            expect(body[0]).to.have.property('phoneNumber')
            expect(body[0]).to.have.property('time')
            expect(body[0]).to.have.property('date')
            expect(body[0]).to.have.property('timestamp')
            expect(body[0]).to.have.property('expireAt')
            done()
        })
    })

    it("get all tickets by timing", (done) => {
        request.get("http://localhost:3333/bookingApi/timing/?time=11:00&date=2020-09-29", (err, res, body) => {
            body = JSON.parse(body)
            console.log(typeof(body))

            expect(body).to.be.a('Array')

            expect(Object.keys(body[0]).length).to.equal(7)

            expect(body[0]).to.have.property('name')
            expect(body[0]).to.have.property('_id')
            expect(body[0]).to.have.property('phoneNumber')
            expect(body[0]).to.have.property('time')
            expect(body[0]).to.have.property('date')
            expect(body[0]).to.have.property('timestamp')

            expect(body[0].time).to.equal("11:00")
            expect(body[0].date).to.equal("2020-09-29")

            done()
        })
    })


    it("create a new ticket", (done) => {
        request.post({
            url: "http://localhost:3333/bookingApi/",
            form:
            {
                "name": "kishan",
                "phoneNumber": "9411860700",
                "time": "11:00",
                "date": "2020-09-29"
            }
        }, (err, res, body) => {
            body = JSON.parse(body)
            console.log(body)
            expect(body).to.be.a('Object')
            expect(body.inserted).to.equal('true')
            done()

        })
    })


    it("update ticket timing", (done) => {
        request.patch({
            url: "http://localhost:3333/bookingApi/5f4b5bd41bf46c37da3961f1",
            form:
            {
                "time": "12:00",
                "date": "2020-09-29"
            }
        }, (err, res, body) => {
            body = JSON.parse(body)
            console.log(body)
            expect(body).to.be.a('Object')
            expect(body.updated).to.equal('true')
            done()

        })
    })

    it("delete a ticket", (done) => {
        request.delete("http://localhost:3333/bookingApi/5f4b762430ae0949eb3b949c", (err, res, body) => {
            body = JSON.parse(body)
            console.log(body)
            expect(body).to.be.a('Object')
            expect(body.deleted).to.equal('true')
            done()
        })
    })

    after(() => {
        server.close()
    })
})