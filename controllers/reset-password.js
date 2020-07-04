const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

exports.resetpassword = async (req,res) => {
    try{
        const { token } = req.params;
        const { password } = req.body;
        const hashedpassword = await bcrypt.hash(password,10);
        const user = await User.findOneAndUpdate({
            api_token : token
        }, {password : password});
        if (!user) {
            res.status(401).json({
                success : false,
                message : "You are not authorized",
                error : {
                    code : 401,
                    message: "You are not authorized" 
                }
            })
        }
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
            subject : "REQUEST TO RESET PASSWORD SUCCESSFUL",
            html : `<P>Dear ${user.firstname} ${user.lastname},</P>
            <p>Your request to update your password has been successful</p><br>
            <p>If you did not make this request, please contact us via <a href='mailto:${process.env.EMAIL_ADDRESS}'>email</a></p>
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
        return res.status(200).json({
            success : true,
            message : "Passsword updated successfully",
            user : {user}
        });
    } catch {
        res.json({
            success : false,
            message : "Failed to update password",
            code : {
                code : 400,
                message : "Failed to update password"
            }
        });
    }
};