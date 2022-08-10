const {Product} = require('../../models/product');

async function deleteProduct(req,res){
    try{
        
        const product = await Product.findByIdAndRemove(req.params.Id);
        if(product){
            return res.status(200).json({
                status: 'success',
                message: 'the product is deleted'
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'product not found'
            });
        }


    } catch(err){
        res.status(400).json({
            status:'faild',
            message: err.message
        })
    }
}
module.exports = deleteProduct;