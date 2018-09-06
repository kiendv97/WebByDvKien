var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var order = {

    name: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }],
    totalPrice: {
        type: Number,
        default: 0
    },
    st: {
        type: Number,
        default: 0
    }
    ,


    date: {
        type: String,
        default: Date.now()
    }
};

module.exports = mongoose.model('order', new Schema(order));