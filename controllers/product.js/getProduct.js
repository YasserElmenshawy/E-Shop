const {Product} = require('../../models/product');

async function getProduct(req,res){
    try{
        const product = await Product.findById(req.params.Id).populate('category');
        if(!product){
            return res.status(200).json({
                status:'success',
                message: 'product Not found'
            });
        }
        res.status(200).json({
            status:'success',
            data:{
                product
            }
        });
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

module.exports = getProduct;