var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var order =  { 
    product : [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }],
    user : {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    guess : {
        type : Schema.Types.ObjectId,
        ref : 'guess'
    },
    date : { 
        type : String,
        default : Date.now()
    }
};

module.exports = mongoose.model('order',new Schema(order));