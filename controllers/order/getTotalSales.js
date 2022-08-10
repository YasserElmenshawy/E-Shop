const {Order} = require('../../models/orders');

async function getTotalSales(req,res){
    try{
        const totalSales = await Order.aggregate([
            {$group: {_id: null, totalSales: { $sum : '$totalPrice'}}}
        ]);
        if(!totalSales){
            return res.status(400).json({
                status:'failed',
                message: 'the order sales cannot be aggregate'
            });
        }
        res.status(200).json({
            status:'success',
            data:{
                totalSales
            }
        });
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}
module.exports = getTotalSales;
