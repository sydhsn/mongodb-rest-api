const Mongoose = require("mongoose");
const UserModel = Mongoose.Schema({
    name: String,
    city: String
});
module.exports = Mongoose.model('UserModel',UserModel);