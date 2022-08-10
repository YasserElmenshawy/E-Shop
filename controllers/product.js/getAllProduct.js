const {Product} = require('../../models/product');

async function getAllProduct(req,res){
    try{
        let filter = {};
        if(req.query.category){
            filter = { category : req.query.category.split(',')}
        }
        const products = await Product.find({filter});
        if(!products){
            return res.status(200).json({
                status:'success',
                message: 'product is empty'
            });
        }
        res.status(200).json({
            status:'success',
            data:{
                products
            }
        });
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

module.exports = getAllProduct;