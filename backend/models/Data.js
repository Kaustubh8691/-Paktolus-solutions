const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: true
    },
    message: {
        type: String, 
        required: true
    },
    comment: {
        type: Object
    }
});

const Blog = mongoose.model("Paktolus",blogSchema);

module.exports = Blog;