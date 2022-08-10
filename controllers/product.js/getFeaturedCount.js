const {Product} = require('../../models/product');

async function getFeaturedCount (req,res) {
    try{
        const count = req.params.count ? req.params.count : 0 ;
        const product = await Product.find({isFeatured:true}).limit(+count);
        if(!product){
            res.status(500).json({
                status:'fail'
            });
        }
        res.status(200).json({
            status:'success',
            data:{
                product
            }
        });

    } catch (err){
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
}

module.exports = getFeaturedCount;