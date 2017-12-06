var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [
    {name: 'Salmon Creek', image: 'https://farm9.staticflickr.com/8454/7930198240_856a39bf27.jpg'},
    {name: 'Granite Hill', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
    {name: "Mountain Goat's Rest", image: 'https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg'}
];

app.get('/', function (req, res) {
    res.render('landing');
});

app.get('/campgrounds', function (req, res) {

    res.render('campgrounds', {campgrounds: campgrounds});
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
    campgrounds.push(newCampground);

    //redirect back to campgrounds page
    res.redirect('/campgrounds');

});

app.listen(3000, function () {
    console.log('The YelpCamp Server has started!');
});