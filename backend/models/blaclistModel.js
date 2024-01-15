const mongoose = require('mongoose');

const blacklistSchema = mongoose.Schema({
    token : {type : String, required : true}
})

const balckListModel = mongoose.model('blackListed_user',blacklistSchema);

module.exports = {
    balckListModel
}