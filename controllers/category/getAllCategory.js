const {Category} = require('../../models/category');
async function getAllCategory (req,res){
    try{
        
        const categors = await Category.find({});
        if(!categors){
            return res.status(200).json({
                status:'success',
                message: 'empty'
            });
        }
        res.status(200).json({
            status:'success',
            data:{
                categors
            }
        })
    }catch(err){
        res.status(400).json({
            status:'faild',
            message: err.message
        })
    }
}

module.exports = getAllCategory;