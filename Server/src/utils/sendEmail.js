import nodemailer from "nodemailer"

const sendEmail = async function (email,message,subject,) {
    
   const transporter =  nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    });

    await transporter.sendMail({
        from:process.env.SMTP_FROM_EMAIL,
        to:email,
        subject:subject,
        html:message
    });
}

export default sendEmail;