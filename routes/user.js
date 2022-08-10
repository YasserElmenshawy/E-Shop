const express =  require('express');
const getUser = require('../controllers/user/getUser');
const getAllUser = require('../controllers/user/getAllUser');
const postUser = require('../controllers/user/postUser');
const updateUser = require('../controllers/user/updateUser');
const deleteUser = require('../controllers/user/deleteUser');
const login = require('../controllers/user/login');
const countUser = require('../controllers/user/countUser');
const {protect} = require('../utils/authentication');
const router = express.Router();

router
    .route('/')
    .get(getAllUser)
    .post(postUser)

router
    .route('/:Id')
    .get(protect,getUser)
    .patch(protect,updateUser)
    .delete(protect,deleteUser)

router.post('/login',login)
router.get('/get/count',protect,countUser)
module.exports = router;