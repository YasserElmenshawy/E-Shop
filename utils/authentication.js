const {User} = require('../models/user');
const jwt = require('jsonwebtoken');

const signin = (id,isAdmin) => {
    return jwt.sign({
        id,
        isAdmin
        },
        process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}
const protect = async (req, res, next) => {
    try {
        let token;
        if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            res.status(400);
            return next(new Error("PLease Login !"));
        }

      // 2- validate token
        const login = jwt.verify(token, process.env.JWT_SECRET);
        const freshUser = await User.findById(login.id);

        if (!freshUser) {
            return next(new Error("Please Login Again !"));
        }

        req.user = freshUser;
        next();
        } catch (error) {
        next(error);
    }
};


module.exports = {
    signin,
    protect
};