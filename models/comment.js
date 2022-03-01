const mongoose = require('mongoose');


const commSchema = new mongoose.Schema({
 
    content:{
         type: String,
         required: true
    },
     //comment belongs to user
    user:{ 
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
    },  
    post:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
    }

},{
    timestamps: true

   });

const Comment = mongoose.model('Comment',commSchema);
module.exports = Comment;
