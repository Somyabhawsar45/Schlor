exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Payment Confirmation</title>
</head>
<body style="margin:0; padding:0; background-color:#060d1a; font-family: Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#060d1a; padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="500" cellpadding="0" cellspacing="0" style="background-color:#0c1a2e; border:1px solid rgba(6,182,212,0.15); border-radius:4px; padding: 32px;">
          <tr>
            <td align="center" style="padding-bottom: 24px;">
          <a href="https://scholr.vercel.app">
<span style="font-size:22px; font-weight:bold; color:#f0f9ff; letter-spacing:1px;">SCHO<span style="color:#06b6d4;">LR</span></span>
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="font-size:18px; font-weight:bold; color:#f0f9ff; padding-bottom:16px;">
              Course Payment Confirmation
            </td>
          </tr>
          <tr>
            <td style="font-size:15px; color:#94a3b8; line-height:1.6;">
              <p style="margin:0 0 12px;">Dear ${name},</p>
              <p style="margin:0 0 12px;">
                We have received a payment of <span style="color:#06b6d4; font-weight:bold;">₹${amount}</span>.
              </p>
              <p style="margin:0 0 6px;">Your Payment ID is <b style="color:#f0f9ff;">${paymentId}</b></p>
              <p style="margin:0 0 6px;">Your Order ID is <b style="color:#f0f9ff;">${orderId}</b></p>
            </td>
          </tr>
          <tr>
            <td align="center" style="font-size:13px; color:#64748b; padding-top: 24px; border-top: 1px solid rgba(6,182,212,0.08);">
              If you have any questions, reach out at
              <a href="mailto:info@Scholr.com" style="color:#06b6d4; text-decoration:none;">info@Scholr.com</a>.
              We're here to help!
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};