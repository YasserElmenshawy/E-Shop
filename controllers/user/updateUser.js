const {User} = require('../../models/user');

async function updateUser (req,res){
    try{

    } catch(err){
        res.status(400).json({
            status:'faild',
            message: err.message
        })
    }

}
module.exports = updateUser;