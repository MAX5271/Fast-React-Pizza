const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    mobile: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    refreshToken: {type: String}
}, {timestamps: true});

userSchema.pre('save', async function (){
    if(!this.isModified("password") || !this.password) return;
    try{
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password,saltRounds);
    }catch(e){
        console.log(e.message);
    }
});

userSchema.method.comparePassword = async function (pwd){
    if(!this.password) return false;
    return await bcrypt.compare(pwd,this.password);
};

module.exports = mongoose.model('User', userSchema);