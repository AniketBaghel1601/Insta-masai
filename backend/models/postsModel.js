const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title : {type : String, required : true},
    body : {type : String, required : true},
    device : {type : String, enum : ["mobile", "tablet", "laptop"], required : true},
    no_of_comments : {type : Number, required : true},
    userId : {type : String, required : true},
    username : {type : String, required : true}
})


const postModel = mongoose.model('post',postSchema);

module.exports = {
    postModel
}