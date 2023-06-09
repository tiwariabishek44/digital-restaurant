const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const ProudctMOdel = mongoose.model('Proudct', productSchema);
module.exports = ProudctMOdel;