const {User} = require('../../models/user');

async function deleteUser (req,res){
    try{
        const user = await User.findByIdAndRemove(req.params.Id);
        if(user){
            return res.status(200).json({
                status: 'success',
                message: 'the user is deleted'
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'user not found'
            });
        }


    } catch(err){
        res.status(400).json({
            status:'faild',
            message: err.message
        })
    }

}
module.exports = deleteUser;