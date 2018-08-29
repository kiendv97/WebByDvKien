var mongoose = require('mongoose'),
var Schema = mongoose.Schema;

var guess = { 
    name : {
        type: String,
        required: true
    },
    phone : { 
        type : String,
        required: true
    },
    address : { 
        type : String,
        required: true
    }
};

module.exports = mongoose.model('guess',new Schema(guess))