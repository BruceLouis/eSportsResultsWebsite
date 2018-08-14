var middleware = require("../middleware");
var request = require("request");
var express = require("express");
var async = require("async");
var router = express.Router();

router.get("/videogames/:videogame_id", function(req, res){    
    var parsed_game_id = req.params.videogame_id; //get id from url parameter
    request(middleware.options('videogames/', parsed_game_id), function(error, response, body){
        if (!error && response.statusCode == 200){
            console.log("successful API call");
            var parsed_data = JSON.parse(body); //parse json
            res.render("show_page/videogame", {game: parsed_data}); 
        }
        else{
            console.log(error);
            res.redirect("/*");
        }
    });
});

router.get("/series/:series_id", function(req, res){  
    var parsed_series_id = req.params.series_id; //get league id from url parameter
    request(middleware.options('series/', parsed_series_id), function(error, response, body){
        if (!error && response.statusCode == 200){
            console.log("successful API call");
            var parsed_data = JSON.parse(body); //parse json
            res.render("show_page/series", {series: parsed_data});
        }
        else{
            console.log(error);
            res.redirect("/*");
        }
    });
});

router.get("/leagues/:league_id", function(req, res){    
    var parsed_league_id = req.params.league_id; //get league id from url parameter
    request(middleware.options('leagues/', parsed_league_id), function(error, response, body){
        if (!error && response.statusCode == 200){
            console.log("successful API call");
            var parsed_data = JSON.parse(body); //parse json
            res.render("show_page/league", {league: parsed_data}); //use index of the id to access correct game
        }
        else{
            console.log(error);
            res.redirect("/*");
        }
    });
});

router.get("/tournaments/:tournament_id", function(req, res){  
    var parsed_tournament_id = req.params.tournament_id; //get tournament id from url parameter
    request(middleware.options('tournaments/', parsed_tournament_id), function(error, response, body){
        if (!error && response.statusCode == 200){
            console.log("successful API call");
            var parsed_data = JSON.parse(body); //parse json
            res.render("show_page/tournament", {tournament: parsed_data});
//            res.send(parsed_data);
        }
        else{
            console.log(error);
            res.redirect("/*");
        }
    });
});

router.get("/matches/:match_id", function(req, res){
    var parsed_match_id = req.params.match_id; //get match id from url parameter
    request(middleware.options('matches/', parsed_match_id), function(error, response, body){
        if (!error && response.statusCode == 200){
            console.log("successful API call");
            var parsed_data = JSON.parse(body); //parse json
            res.render("show_page/match", {match: parsed_data});
//            res.send(parsed_data);
        }
        else{
            console.log(error);
            res.redirect("/*");
        }
    });
});

router.get("/teams/:team_id", function(req, res){
    
    /*  here I want the team page to display the team  information as well 
        as the matches they've participated in on the same page. however, 
        matches and teams are on different json links, therefore I need to
        make this get method handle 2 requests at once instead of per usual 1 
        requests. so we use async.parallel to help get this job done.
    */
    
    var parsed_team_id = req.params.team_id;    //get match id from url parameter
    async.parallel([                          //could use a function clean up
        function(next) {
            request(middleware.options('teams/', parsed_team_id), function(error, response, body){
                if (!error && response.statusCode == 200){
                    console.log("successful API call");
                    var parsed_team_data = JSON.parse(body); //parse json
                    next(null, parsed_team_data);   /*  The first argument to those functions next should be an error if relevant (I put null) 
                                                        - as soon as one is called with an error, the final function will be called with that
                                                        same error and the rest of the callbacks will be ignored. */
                }
                else{
                    console.log(error);
                    res.redirect("/*");
                }
            });
        },
        function(next) {
            request(middleware.options('teams/', parsed_team_id, '/matches'), 
            function(error, response, body){
                if (!error && response.statusCode == 200){
                    console.log("successful API call");
                    var parsed_match_data = JSON.parse(body); //parse json
                    next(null, parsed_match_data);
                }    
            });
        }],
        function(err, results) {
            // results is [parsed_team_data, parsed_match_data]
            if (err){
                console.log(err);
            }
            else{
                res.render("show_page/team", {team: results[0], matches: results[1]});
            }
        }
    );
});

module.exports = router;