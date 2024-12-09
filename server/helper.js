const nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.Email,
        pass : process.env.password
    }
})

module.exports = transport;