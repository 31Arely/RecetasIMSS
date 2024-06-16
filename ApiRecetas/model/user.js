const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    curp: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fLastName: {
        type: String,
        required: true
    },
    lLastName: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});




userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);


