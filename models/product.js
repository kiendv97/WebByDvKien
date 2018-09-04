var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
    title: {
        type: String,
        required: true
    },
    
    price: {
        type: Number,
        default: Number(0)
    },
    color: {
        type: String

    },
    img: [{
        type: String
    }],
    
    des : {
         type: String
    },
    cateId : {
        type: Schema.Types.ObjectId,
        ref: 'cate'
    }

});

module.exports = mongoose.model('product', product);
