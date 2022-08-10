const {Order} = require('../../models/orders');

async function userOrders(req,res){
    try{
        const userOrdersList = await Order.find({user: req.params.userId})
        .populate({
            path: 'orderItems',populate: {
                path: 'product', populate:  ('category')
            }
        }).sort({'dateOrdered': -1});
        if(!userOrdersList){
            return res.status(200).json({
                status:'success',
                message: 'empty'
            });
        }
        res.status(200).json({
            status:'success',
            data:{
                userOrdersList
            }
        })
    } catch(err){
        res.status(400).json({
            status:'faild',
            message: err.message
        })
    }

}
module.exports = userOrders;