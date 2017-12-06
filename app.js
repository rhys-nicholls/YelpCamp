var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//Setup schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//Create model from schema
var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
//         description: "THis is a huge granite hill, no bathrooms. Lots and lots of granite!"
//
//     },
//     function (err, campground) {
//         if(err){
//             console.log(err);
//         } else {
//             console.log("success");
//         }
//     });

app.get('/', function (req, res) {
    res.render('landing');
});

//INDEX - show all campgrounds
app.get('/campgrounds', function (req, res) {
    //get all campgrounds from DB
    Campground.find({}, function (err, campgrounds) {
        if(err){
            console.log(err);
        } else {
            res.render('index', {campgrounds: campgrounds});
        }
    });
});

//NEW - show form to create new campground
app.get('/campgrounds/new', function (req, res) {
    res.render('new.ejs');
});

// CREATE - Add new campground to DB
app.post('/campgrounds', function (req, res) {

    //get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};

    //Create new campground and add to DB
    Campground.create(newCampground, function (err, newlyCreated) {
       if(err){
           console.log(err);
       } else {
           //redirect back to campgrounds page
           res.redirect('/campgrounds');
       }
    });
});

//SHOW - shows more info about one campground
app.get('/campgrounds/:id', function (req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id, function (err, foundCampground) {
        if(err){
            console.log(err);
        } else {
            //render show template using information foudn with the ID
            res.render('show', {campground: foundCampground});
        }
    });
});

//Setup listen port
app.listen(3000, function () {
    console.log('The YelpCamp Server has started!');
});