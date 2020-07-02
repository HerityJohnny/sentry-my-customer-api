const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = {  
resetpassword(req,res,next) {
    let { email, newPassword } = req.body;
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(newPassword,salt, (err,hash) => {
            newPassword = hash;
            User.updateOne({email : email},{ $set: { password : newPassword } }, (err, user) => {
                 if(err) {
                    res.status(404).json({
                        success : false,
                        message : "An error occured",
                        error : {
                            code : 404,
                            message : "An error occured"
                        }
                    })
                } else {
                    res.status(200).json({
                        success : true,
                        message : "Password has been updated successfully",
                        user : {
                            id : user._id,
                            email : user.email,
                            phone_number : user.phone_number
                        }
                    })
                }
            })
        })
    })
}
}

