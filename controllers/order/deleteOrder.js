const {Order} = require('../../models/orders');
const {OrderItem} = require('../../models/order-item');

async function deleteOrder(req,res){
    try{
        
        const order = await Order.findByIdAndRemove(req.params.Id);
        
        if(order){
            await  order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({
                status: 'success',
                message: 'the order is deleted'
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'order not found'
            });
        }


    } catch(err){
        res.status(400).json({
            status:'faild',
            message: err.message
        })
    }
}
module.exports = deleteOrder;