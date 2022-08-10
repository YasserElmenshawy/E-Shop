const {Category} = require('../../models/category');
const getAllCategory = require('./getAllCategory');

async function getCategory (req,res) {
    try{
        const category = await Category.findById(req.params.Id);
        if(category){
            return res.status(200).json({
                status:'success',
                data:{
                    category
                }
            });
        } else {
            return res.status(404).json({
                status: 'fail',
                message : 'category not found'
            });
        }
    } catch (err){
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
}

module.exports = getCategory