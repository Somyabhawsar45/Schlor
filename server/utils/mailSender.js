const { Resend } = require("resend")

const resend = new Resend(process.env.RESEND_API_KEY)

const mailSender = async (email, title, body) => {
  try {
    const data = await resend.emails.send({
      from: "Schlor <onboarding@resend.dev>",
      to: email,
      subject: title,
      html: body,
    })
    console.log("Email sent successfully:", data)
    return data
  } catch (error) {
    console.log("Email error:", error.message)
    return error.message
  }
}

module.exports = mailSender