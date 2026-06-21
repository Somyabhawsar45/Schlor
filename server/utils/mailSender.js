const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port : 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    })

let info = await transporter.sendMail({
  from: `"Scholr | Somya" <somyabhawsar194@gmail.com>`,
  to: `${email}`,
  subject: `${title}`,
  html: `${body}`,
})
console.log("FULL INFO:", JSON.stringify(info))
console.log("REJECTED:", info.rejected)
console.log("RESPONSE:", info.response)
    return info
  } catch (error) {
    console.log(error.message)
    return error.message
  }
}

module.exports = mailSender