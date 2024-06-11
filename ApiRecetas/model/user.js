const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {Schema} = mongoose;
const userSchema = new Schema({
    curp: String, 
    password: String,
    name: String,
    fLastName: String,
    lLastName: String,
    userType: String,
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, this.password);
};

userSchema.methods.comparePassword = function (password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);