const {User} = require('../../models/user');


async function getUser(req,res){
    try{
        const users = await User.findById(req.params.Id).select('-password');
        if(!users){
            return res.status(404).json({
                status:'success',
                message: 'NOT FOUND'
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
module.exports = getUser ;