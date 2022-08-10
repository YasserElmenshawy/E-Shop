const {Category} = require('../../models/category');

async function deleteCategory(req,res){
    try{
        
        const category = await Category.findByIdAndRemove(req.params.Id);
        if(category){
            return res.status(200).json({
                status: 'success',
                message: 'the category is deleted'
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'category not found'
            });
        }


    } catch(err){
        res.status(400).json({
            status:'faild',
            message: err.message
        })
    }
}

module.exports = deleteCategory;