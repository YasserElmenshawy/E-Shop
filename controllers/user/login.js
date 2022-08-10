const {User} = require('../../models/user');
const {signin} = require('../../utils/authentication');

async function login (req,res) {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                status: 'fail',
                message: 'pleace enter required data'
            });
        }
        const user = await User.findOne({email}).select(+password);
        if(!user || !(await user.correctPassword(password,user.password))){
            return res.status(400).json({
                status: "failed",
                message: "email or password is incorrect",
            });
        }
        const token = signin(user._id,user.isAdmin);
        res.status(200).json({
            status: "success",
            token
            /* data: { 
                user,
                token
            } */

        });
    } catch(err){
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
}

module.exports = login;