const {Category} = require('../../models/category');

async function updateCategory(req,res){
    try{
        const category = await Category.findByIdAndUpdate(
            req.params.Id,
            {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },
        {new: true}
        );
        if(!category){
            return res.status(400).json({
                status:'fail',
                message: 'category connot be created'
            });
        }
        res.status(200).json({
            status:'success',
            data: {
                category
            }
        });
    } catch(err){
        res.status(400).json({
            status:'fail',
            message: err.message
        });
    }
}

module.exports = updateCategory;