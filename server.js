const express = require('express');
const engine = require('ejs-mate');
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require('dotenv').config()
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(express.json())

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index')
})

//NODEMAILER CODE

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

app.post("/send", (req, res) => {
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
        console.log(fields);
        Object.keys(fields).forEach(function (property) {
            data[property] = fields[property].toString();
        });
        console.log(data);
        const mail = {
            sender: `${data.name} <${data.email}>`,
            to: process.env.EMAIL,
            subject: data.subject,
            text: `${data.name} <${data.email}> \n${data.message}`,
        };
        transporter.sendMail(mail, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send("Something went wrong.");
            } else {
                res.status(200).json({ status: 'success' })
            }
        });
    });
});


// SERVER

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
