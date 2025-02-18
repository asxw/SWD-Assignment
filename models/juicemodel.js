const mongoose = require('mongoose');

const juiceSchema = new mongoose.Schema({
    brand_code: {
        type: Number,
        require: true,
    },
    brand: String,
    description: String,
})

const Juice = mongoose.model('Juice', juiceSchema);

module.exports = Juice;