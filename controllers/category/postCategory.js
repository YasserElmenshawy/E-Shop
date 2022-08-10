const {Category} = require('../../models/category');

async function postCategory(req,res){
    try{
        const {name , icon ,color } = req.body;
        const newCategory = await Category.create({
            name,
            icon,
            color
        });
        res.status(200).json({
            status:'success',
            data:{
                newCategory
            }
        })
    } catch(err){
        res.status(400).json({
            status:'faild',
            message: err.message
        })
    }
}

module.exports = postCategory;