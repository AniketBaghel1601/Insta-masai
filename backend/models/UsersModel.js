const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true},
    gender : {type : String, required : true},
    password : {type : String, required : true},
    age : {type : Number, required : true},
    city : {type : String, required : true}
})


const UserModel = mongoose.model('user',usersSchema);

module.exports = {
    UserModel
}