const nodemailer = require("nodemailer")

const stripHtml = (html) =>
  html
    .replace(/<style[^>]*>.*?<\/style>/gis, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()

const mailSender = async (email, title, body) => {
  try {
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  family: 4,  // force IPv4
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  secure: false,
})
    let info = await transporter.sendMail({
      from: `"Schlor" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
      text: stripHtml(body),
      headers: {
        "X-Priority": "3",
        "X-Mailer": "Schlor Mailer",
        "List-Unsubscribe": `<mailto:info@Schlor.com>`,
        "Reply-To": process.env.MAIL_USER,
      },
    })

    console.log(info.response)
    return info
  } catch (error) {
    console.log(error.message)
    return error.message
  }
}

module.exports = mailSender