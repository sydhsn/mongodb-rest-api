const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
const UserModel = require("./model/model");
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.listen(3000, () => {
    console.log("Listening at :3000...");
});
Mongoose.connect("mongodb://localhost:27017/userdetails",{'useNewUrlParser': true});
app.post("/user", async (request, response) => {
    try {
        var user = new UserModel(request.body);
        var result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
app.get("/users", async (request, response) => {
    try {
        var result = await UserModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
app.get("/user/:id", async (request, response) => {
    try {
        var user = await UserModel.findById(request.params.id).exec();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});
app.put("/user/:id", async (request, response) => {
    try {
        var user = await UserModel.findById(request.params.id).exec();
        user.set(request.body);
        var result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});
app.delete("/user/:id", async (request, response) => {
    try {
        var result = await UserModel.deleteOne({ _id: request.params.id }).exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});



