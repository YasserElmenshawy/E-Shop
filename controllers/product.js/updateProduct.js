const {Product} = require('../../models/product');
const {Category} = require('../../models/category');
async function updateProduct(req,res){
    try{
        const category = await Category.findById(req.body.category);
        if(!category){
            return res.status(400).json({
                status:'fail',
                message:'Invalid Category'
            });
        }
        const product = await Product.findByIdAndUpdate(
            req.params.Id,
            {
                name: req.body.name,
                description:req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                images: req.body.images,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured,
                dataCreated: req.body.dataCreated
        },
        {new: true}
        );
        if(!product){
            return res.status(400).json({
                status:'fail',
                message: 'product connot be Update'
            });
        }
        res.status(200).json({
            status:'success',
            data: {
                product
            }
        });
    } catch(err){
        res.status(400).json({
            status:'fail',
            message: err.message
        });
    }
}

module.exports = updateProduct;