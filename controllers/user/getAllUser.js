const {User} = require('../../models/user');

async function getAllUser(req,res){
    try{
        const users = await User.find({}).select('-password');
        if(!users){
            return res.status(200).json({
                status:'success',
                message: 'empty'
            });
        }
        res.status(200).json({
            status:'success',
            data:{
                users
            }
        })
    } catch(err){
        res.status(400).json({
            status:'faild',
            message: err.message
        })
    }

}
module.exports = getAllUser;