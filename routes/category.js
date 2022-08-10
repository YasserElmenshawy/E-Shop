const express =  require('express');
const getAllCategory = require('../controllers/category/getAllCategory');
const getCategory = require('../controllers/category/getCategory');
const postCategory = require('../controllers/category/postCategory');
const deleteCategory = require('../controllers/category/deleteCategory');
const updateCategory = require('../controllers/category/updateCategory');
const {protect} = require('../utils/authentication');


const router = express.Router();

router
    .route('/')
    .get(getAllCategory)
    .post(protect,postCategory);

router
    .route('/:Id')
    .get(getCategory)
    .patch(protect,updateCategory)
    .delete(protect,deleteCategory);
module.exports = router;