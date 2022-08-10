const {Product} = require('../../models/product');
const { Category} = require('../../models/category');
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
});




async function postProduct(req,res){
    try{
        const category = await Category.findById(req.body.category);
        if(!category){
            return res.status(400).json({
                status:'fail',
                message:'Invalid Category'
            });
        }
        const file = req.file;
        const fileName = file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        const newProduct = await Product.create({
            name: req.body.name,
            description:req.body.description,
            richDescription: req.body.richDescription,
            image: `${basePath}${fileName}`,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
            dataCreated: req.body.dataCreated
        });
        if(!newProduct){
            return res.status(500).json({
                status:'fail',
                message: 'the product cannt be create'
            });
        }
        res.status(200).json({
            status: 'success',
            data:{
                newProduct
            }
        });

    } catch(err){
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
}

module.exports = {postProduct,storage};