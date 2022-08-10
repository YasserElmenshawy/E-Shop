const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    street: {
        type: String,
        default: ''
    },
    apartment:{
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    city:{
        type: String,
        default: ''
    },
    country:{
        type: String,
        default: ''
    }
    
});

userSchema.pre('save',async function(next){
    //only run this function if password modifyed
    if(!this.isModified('password')) return next();
    //hash this password with cost is 12 
    this.password = await bcrypt.hash(this.password, 12);
    //delete password confirm field
    next();
});


userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});
userSchema.set('toJSON' , {
    virtuals:true
});


userSchema.methods.correctPassword = async function (candidatePassword,userPassword) {
    return await bcrypt.compare(candidatePassword,userPassword);
}

exports.User = mongoose.model('User',userSchema);
