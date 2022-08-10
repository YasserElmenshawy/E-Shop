const {Order} = require('../../models/orders');
async function updateOrder(req,res){
    try{
        
        const order = await Order.findByIdAndUpdate(
            req.params.Id,
            {
                status: req.body.status
            },
        {new: true}
        );
        if(!order){
            return res.status(400).json({
                status:'failed',
                message: 'order connot be Update'
            });
        }
        res.status(200).json({
            status:'success',
            data: {
                order
            }
        });
    } catch(err){
        res.status(400).json({
            status:'fail',
            message: err.message
        });
    }
}

module.exports = updateOrder;