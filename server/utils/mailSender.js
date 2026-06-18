const dns = require("dns")
dns.setDefaultResultOrder("ipv4first")

const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    })

    await transporter.verify()
    console.log("SMTP Connected")

    let info = await transporter.sendMail({
      from: `"Schlor | Somya" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    })

    console.log("Email sent successfully:", info.response)
    return info
  } catch (error) {
    console.error("Email error:", error)
    throw error
  }
}

module.exports = mailSender