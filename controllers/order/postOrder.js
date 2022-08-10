const {Order} = require('../../models/orders');
const {OrderItem} = require('../../models/order-item');

async function postOrder(req,res){
    try{
        const orderItemsIds = Promise.all( req.body.orderItems.map(async orderItem => {
            let newOrderItem = await OrderItem.create({
                quantity: orderItem.quantity,
                product : orderItem.product
            });
            return newOrderItem._id;
        }));
        const orderItemsIdResolved = await orderItemsIds;

        const totalPrices = await Promise.all(orderItemsIdResolved.map(async (orderItemId)=>{
            const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice;
        }));
        console.log(totalPrices);
        const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

        const newOrder = await Order.create({
            orderItems: orderItemsIdResolved,
            shippingAddress1: req.body.shippingAddress1 , 
            shippingAddress2: req.body.shippingAddress2 ,
            city: req.body.city , 
            zip: req.body.zip , 
            country: req.body.country ,
            phone: req.body.phone ,
            status: req.body.status ,
            totalPrice: totalPrice ,
            user: req.body.user ,
            dateOrdered: req.body.dateOrdered 
        });
        res.status(200).json({
            status:'success',
            data:{
                newOrder
            }
        })
    } catch(err){
        res.status(400).json({
            status:'faild',
            message: err.message
        })
    }
}

module.exports = postOrder;