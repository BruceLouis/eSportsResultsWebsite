//normal importing of frameworks
var middleware = require("./middleware");
var bodyParser = require("body-parser");
var express = require("express");
var moment = require("moment");
var app = express();

var pages = require("./routes/pages");
var index = require("./routes/index");

//==================
// FUNCTIONS
//==================

//middleware items such as parsing json with body parser and enabling certain functions to be used in ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.locals.moment = moment;
app.locals.checkLettersAndDigits = middleware.checkLettersAndDigits;
app.locals.capitalizeFirstLetter = middleware.capitalizeFirstLetter;

//middleware for routes
app.use(pages);
app.use(index);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});