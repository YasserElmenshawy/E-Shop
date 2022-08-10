const {Order} = require('../../models/orders');

async function countOrder(req,res){
    try{
        const orderCount = await Order.countDocuments();
        if(!orderCount){
            return res.status(200).json({
                status:'success',
                message: 'product Not found'
            });
        }
        res.status(200).json({
            status:'success',
            data:{
                orderCount
            }
        });
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}
module.exports = countOrder;
