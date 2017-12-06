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
    image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

app.get('/', function (req, res) {
    res.render('landing');
});

app.get('/campgrounds', function (req, res) {
    //get all campgrounds from DB
    Campground.find({}, function (err, campgrounds) {
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds', {campgrounds: campgrounds});
        }
    });
});

app.get('/campgrounds/new', function (req, res) {
    res.render('new.ejs');
});

// POST - Add new campground
app.post('/campgrounds', function (req, res) {

    //get data from form and add to array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};

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


//Setup listen port
app.listen(3000, function () {
    console.log('The YelpCamp Server has started!');
});