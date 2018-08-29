var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'new'
    },
    price: {
        type: Number,
        default: Number(0)
    },
    color: {
        type: String

    },
    images: [{
        type: String
    }],
    size : {
        type : String
        
    },
    des : {
         type: String
    }

});

module.exports = mongoose.model('product', product);
