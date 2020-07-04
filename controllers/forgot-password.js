const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.forgotpassword = await (req,res) => {
        try {
            const { email } = req.body;
            const buffer = crypto.randomBytes(20);
            const token = buffer.toString();
            const expirationTime = Date.now() + 3600000; // 1 hour
            const user = await User.findOne({
                email : email
            });
            if(!user) {
                res.status(401).json({
                    success : false,
                    message : "You are not authorized",
                    error : {
                        code : 401,
                        message: "You are not authorized" 
                    }
                })
            }
            const resetUrl = `http://${req.headers.host}auth/reset-password/${token}`;
            const transporter = nodemailer.createTransport({
                service : process.env.MAIL_SERVICE,
                port : 465,
                auth : {
                    user : process.env.MAIL_USERNAME,
                    pass : process.env.MAIL_PASSWORD
                },
                tls : {
                    rejectUnauthorized : false
                }
            });
            const mailOptions = {
                from : `myCustomer Support Team${process.env.EMAIL_ADDRESS}`,
                to : user.email,
                subject : "REQUEST TO RESET PASSWORD",
                html : `<P>Dear ${user.firstname} ${user.lastname},</P>
                <p>There was a request to reset your password </p><br>
                <p>Click on the link below to get a new password</p><br>
                <a href =${resetUrl}>Reset password</a>
                <p>If you did not make this request, just ignore this mail as nothing has changed,</p>
                 <p>For more enquires, please contact us via <a href='mailto:${process.env.EMAIL_ADDRESS}'>email</a></p>
                <br>
                <br>
                <p>Best Regards, myCustomer Support Team</p>`
            }
            try {
                transporter.sendMail(mailOptions);
                res.json({
                    success : true,
                    message : "Reset mail sent",
                    code : {
                        code : 200,
                        message : "Reset mail sent"
                    }
                })
            } catch {
                res.json({
                    success : false,
                    message : "Reset mail not sent",
                    code : {
                        code : 400,
                        message : "Reset mail not sent"
                    }
                });
        }
     } catch {
        res.json({
            success : false,
            message : "Failed to update password",
            code : {
                code : 400,
                message : "Failed to update password"
            }
        })
        }
}
