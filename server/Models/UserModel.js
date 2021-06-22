const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true

    },
    name: {
        type: String,
        required: true
    },
    magazines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Magazine'
    }]
})
module.exports = mongoose.model('User', userSchema)