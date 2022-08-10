const {User} = require('../../models/user');

async function countUser (req,res){
    try{
        const usrtCount = await User.countDocuments();
        if(!usrtCount){
            return res.status(200).json({
                status:'success',
                message: 'user Not found'
            });
        }
        res.status(200).json({
            status:'success',
            data:{
                usrtCount
            }
        });
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}
module.exports = countUser;
