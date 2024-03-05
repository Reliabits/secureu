import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
  secure:false,
    auth: {
        user: process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASS
    }
})

transporter.verify((err, succ) => {
    if (err) {
      console.log(err);
    } else if (succ) {
      console.log("mail service connected");
    }
  });

export const sendMail=async(email,subject,html)=>{

    try {
       let result= await transporter.sendMail({
            to:email,
            subject: subject,
            html:html
        })
        return result
    } catch (error) {
        console.log(error,"email not sent");
    }
}
