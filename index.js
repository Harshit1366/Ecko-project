const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const app = express();
var router = express.Router();
const keys = require("./config/keys");
require("./models/courses");
mongoose.Promise = require("bluebird");
mongoose.connect(keys.MONGO_URI);

hbs.registerPartials(__dirname + "/views/partials");


hbs.registerHelper('ifStringEquals', function(arg1, arg2, options) {
    console.log("IF STRING EQUALS", arg1, arg2);
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
hbs.registerPartial('styleholder', 'styleholder')

app.set("view engine", "hbs");

const courses = mongoose.model("courses");

app.get("/", async (req, res) => {
	let everything = await courses.find({}).exec();
	console.log(everything);
  res.render("index",{everything});
});

app.get("/course/:id",async (req, res)=>{
    let id = mongoose.Types.ObjectId(req.params.id);
    let everything = await courses.findById(id).exec();
    console.log("Result",everything);
    res.render("course",{everything});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);
