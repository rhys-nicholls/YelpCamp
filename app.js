var express = require('express');
var app = express();

app.set('view engine', 'ejs');


app.get('/', function (req, res) {
    res.render('landing');
});

app.get('/campgrounds', function (req, res) {
    var campGrounds = [
        {name: 'Salmon Creek', image: 'https://farm9.staticflickr.com/8454/7930198240_856a39bf27.jpg'},
        {name: 'Granite Hill', image: 'https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg'},
        {name: "Mountain Goat's Rest", image: 'https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg'}
    ];
    res.render('campgrounds', {campGrounds: campGrounds});
});

app.listen(3000, function () {
    console.log('The YelpCamp Server has started!');
});