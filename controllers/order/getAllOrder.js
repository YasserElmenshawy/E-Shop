const {Order} = require('../../models/orders');

async function getAllOrder(req,res){
    try{
        const orders = await Order.find({}).populate('user','name');
        if(!orders){
            return res.status(200).json({
                status:'success',
                message: 'empty'
            });
        }
        res.status(200).json({
            status:'success',
            data:{
                orders
            }
        })
    } catch(err){
        res.status(400).json({
            status:'faild',
            message: err.message
        })
    }

}
module.exports = getAllOrder;