const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var newComment = new Schema({
    cmt : {
        type: String
    },
    name : {
        type: String
    },
    email : {
        type: String
    }
    
})

var newArticle =  new Schema({
    cate : {
        type: String
    },
    date: {
        type: Date,
        default : Date.now()
    },
    title : {
        type: String
    },
    des : {
        type: String
    },
    img : {
        type: String,
        
    },
    tags :[{
        type: String
    }],
    comment : [newComment]
},{
    collections: 'article'
});

module.exports = mongoose.model('article',newArticle);