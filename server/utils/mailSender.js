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
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    let info = await transporter.sendMail({
      from: `"Schlor" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
      text: stripHtml(body),
    })

    console.log("Email sent successfully:", info.response)
    return info

  } catch (error) {
    console.log("Email error:", error)
    throw error
  }
}

module.exports = mailSender