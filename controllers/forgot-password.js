const User = require('../models/user');
const bcrypt = require('bcryptjs');


module.exports = {
    forgotPassword(req,res) {
        let { email, newpassword } = req.body;
        /**
         * Search if user exist 
         */
        User.findOne({_id : req.params.id})
        .exec()
        .then(result => {
            if(!result) {
                res.status(401).json({
                    success : false,
                    message : "User Not Found",
                    error : {
                        code : 401,
                        message : "User not Found"
                    }
                })
            } else {
                /**
                 * if a user is found hash the password and save it to the database
                 */
                bcrypt.genSalt(10, (err,salt) => {
                    bcrypt.hash(newpassword,salt, (err,hash) => {
                        newpassword = hash;
                        User.updateOne({email : email}, { $set : {password : newpassword}})
                        .exec()
                        .then(docs => {
                            return res.status(200).json({
                                status : true,
                                message : "Password updated successfully",
                                data : {user}
                            })
                        })
                        .catch(err => {
                            res.status(404).json({
                                success : false,
                                message : "Failed to update password",
                                error : {
                                    code : err.code,
                                    message : err.message
                                }
                            })
                        })
                    })
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                success : false,
                message : "An error occured",
                error : {
                    code : err.code,
                    message : err.message
                }
            })
        })
    }
}