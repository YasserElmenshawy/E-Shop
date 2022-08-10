const {User} = require('../../models/user');

async function postUser (req,res){
    try{
        const newUser = await User.create({
            name: req.body.name ,
            email: req.body.email ,
            password: req.body.password ,
            phone: req.body.phone ,
            isAdmin: req.body.isAdmin ,
            street: req.body.street ,
            apartment: req.body.apartment ,
            zip: req.body.zip ,
            city: req.body.city ,
            country:req.body.country
        });
        if(!newUser){
            return res.status(500).json({
                status: 'fail',
                message: 'error in server'
            });
        }
        res.status(200).json({
            status:'success',
            data:{
                newUser
            }
        });


    } catch(err){
        res.status(400).json({
            status:'faild',
            message: err.message
        })
    }

}
module.exports = postUser;