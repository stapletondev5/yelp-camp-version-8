var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");






//===========INDEX - show all campgrounds
router.get("/", function(req, res){
    console.log(req.user);
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
             res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});
//========== CREATE - add new campground to DB
router.post("/",isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // Create a new campground and save to DB
    // campgrounds.push(newCampground);
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
             res.redirect("/campgrounds");
        }
    });
    //get data from form and add campgrounds array
    //redirect back to campgrounds page
   
});


//NEW - show form to create new campground
router.get("/new", isLoggedIn ,function(req, res){
  res.render("campgrounds/new");  
});


//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    //rend show template with that campground
    
});
function isLoggedIn(req, res , next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}





module.exports = router