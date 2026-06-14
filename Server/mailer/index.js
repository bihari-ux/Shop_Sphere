const nodemailer = require("nodemailer")

const mailer = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth:{
        user:process.env.MAIL_SENDER,
        pass:process.env.MAIL_PASSWORD
    }
})
module.exports = mailer 
