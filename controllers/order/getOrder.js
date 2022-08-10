const {Order} = require('../../models/orders');

async function getOrder(req,res){
    try{
        const order = await Order.findById(req.params.Id)
        .populate('user','name')
        .populate({
            path: 'orderItems',populate: {
                path: 'product', populate:  ('category')
            }
        });
        if(!order){
            return res.status(200).json({
                status:'success',
                message: 'empty'
            });
        }
        res.status(200).json({
            status:'success',
            data:{
                order
            }
        })
    } catch(err){
        res.status(400).json({
            status:'faild',
            message: err.message
        })
    }

}
module.exports = getOrder;