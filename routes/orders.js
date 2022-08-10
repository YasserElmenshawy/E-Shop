const express =  require('express');
const getAllOrder = require('../controllers/order/getAllOrder');
const getOrder = require('../controllers/order/getOrder');
const postOrder = require('../controllers/order/postOrder');
const updateOrder = require('../controllers/order/updateOrder');
const deleteOrder = require('../controllers/order/deleteOrder');
const getTotalSales = require('../controllers/order/getTotalSales');
const countOrder = require('../controllers/order/getCountOrder');
const userOrders = require('../controllers/order/userOrders');
const {protect} = require('../utils/authentication');

const router = express.Router();

router
    .route('/')
    .get(getAllOrder)
    .post(protect,postOrder)

router
    .route('/:Id')
    .get(protect,getOrder)
    .patch(protect,updateOrder)
    .delete(protect,deleteOrder)

router.get('/get/count/',protect,countOrder)
router.get('/get/totalsale/',protect,getTotalSales)
router.get('/get/userorders/:userId',protect,userOrders)


module.exports = router;