const express =  require('express');
const getProduct = require('../controllers/product.js/getProduct');
const getAllProduct = require('../controllers/product.js/getAllProduct');
const {postProduct,storage} = require('../controllers/product.js/postProduct');
const updateProduct = require('../controllers/product.js/updateProduct');
const deleteProduct = require('../controllers/product.js/deleteProduct');
const countProduct = require('../controllers/product.js/countProduct');
const getFeaturedCount = require('../controllers/product.js/getFeaturedCount');
const {protect} = require('../utils/authentication');

const multer = require('multer');
const uploadOptions = multer({ storage: storage })

const router = express.Router();

router
    .route('/')
    .get(getAllProduct)
    .post(protect,uploadOptions.single('image'),postProduct)

router
    .route('/:Id')
    .get(getProduct)
    .patch(protect,updateProduct)
    .delete(protect,deleteProduct)


router.get('/get/count',protect,countProduct);
router.get('/get/featured/:count',protect,getFeaturedCount);

module.exports = router;