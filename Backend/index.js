
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const app = express()

app.use(cors())
app.use(express.json())

// Connecting to MongoDB
mongoose.connect("mongodb+srv://hrishirajeev24_db_user:rxkmSSZkiJg4QtRy@cluster0.4dfhbwf.mongodb.net/passkey")
.then(function() {
    console.log("Connected to DB")
})
.catch(function() {
    console.log("Failed to connect")
})

// Getting credential collection from MongoDB
const credential = mongoose.model("credential", {}, "bulkmail")

credential.find().then(function(data) {
    console.log(data[0].toJSON())
}).catch(function(error) {
    console.log(error)
})

// API call for sending bulk emails
app.post('/sendmail', function(req, res) {

    var msg = req.body.msg
    var emailList = req.body.emaillist

    // Getting Gmail credentials from MongoDB
    credential.find().then(function(data) {

        // Creating Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: data[0].toJSON().user,
                pass: data[0].toJSON().pass
            }
        })

        // Sending emails using Promise
        new Promise(async function(resolve, reject) {

            try {

                for (var i = 0; i < emailList.length; i++) {

                    await transporter.sendMail({
                        from: data[0].toJSON().user,
                        to: emailList[i],
                        subject: "A message from Bulk Mail App",
                        text: msg
                    })

                    console.log("Email sent to:" + emailList[i])
                }

                resolve("Success")

            }
            catch(error) {
                reject("Failed")
            }

        })
        .then(function() {
            res.send(true)
        })
        .catch(function(error) {
            console.log(error)
            res.send(false)
        })

    })
    .catch(function(error) {
        console.log(error)
        res.send(false)
    })

})

// Server creation
app.listen(5000, function() {
    console.log("Server Started......")
})
