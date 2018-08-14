var middleware = require("../middleware");
var request = require("request");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res){    
    request(middleware.options('videogames'), function(error, response, body){
        if (!error && response.statusCode == 200){
            console.log("successful API call");
            var parsedData = JSON.parse(body);
            res.render("index", {data: parsedData});
        }
        else{
            console.log(error);
        }
    });
});

router.get("/videogames", function(req, res){    
    request(middleware.options('videogames'), function(error, response, body){
        if (!error && response.statusCode == 200){
            console.log("successful API call");
            var parsedData = JSON.parse(body);
            res.render("show_all/videogames", {data: parsedData});
        }
        else{
            console.log(error);
        }
    });
});

router.get("/leagues", function(req, res) {
    request(middleware.options('leagues'), function(error, response, body){
        if (!error && response.statusCode == 200){
            console.log("successful API call");
            var parsed_data = JSON.parse(body); //parse json
            res.render("show_all/leagues", {leagues: parsed_data});
//            res.send(parsed_data);
        }
        else{
            console.log(error);
        }
    });    
});

router.get("/teams", function(req, res) {
    request(middleware.options('teams'), function(error, response, body){
        if (!error && response.statusCode == 200){
            console.log("successful API call");
            var parsed_data = JSON.parse(body); //parse json
            res.render("show_all/teams", {teams: parsed_data});
//            res.send(parsed_data);
        }
        else{
            console.log(error);
        }
    });    
});

router.get("*", function(req, res){
    res.render("page_not_found"); 
});

module.exports = router;