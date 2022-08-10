const {Product} = require('../../models/product');

async function countProduct (req,res){
    try{
        const productCount = await Product.countDocuments();
        if(!productCount){
            return res.status(200).json({
                status:'success',
                message: 'product Not found'
            });
        }
        res.status(200).json({
            status:'success',
            data:{
                productCount
            }
        });
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}
module.exports = countProduct;
