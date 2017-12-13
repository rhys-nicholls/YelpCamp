var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    LocalStrategy   = require("passport-local");
    Campground      = require('./models/campground');
    Comment         = require('./models/comment');
    User            = require('./models/user');
    seedDb          = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
seedDb();

//PASSPORT config
app.use(require('express-session')({
    secret: 'YelpCamp Web App Project',
    resave: false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//HOMEPAGE
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
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    });
});

//NEW - show form to create new campground
app.get('/campgrounds/new', function (req, res) {
    res.render('campgrounds/new');
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

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// =================
// COMMENTS ROUTES
// =================


app.get('/campgrounds/:id/comments/new', isLoggedIn, function (req, res) {
    // find campground by id
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
});

app.post('/campgrounds/:id/comments', isLoggedIn, function (req, res) {
    //lookup campground using id
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            //create new comment
            Comment.create(req.body.comment, function (err, comment) {
                if(err){
                   console.log(err);
                } else {
                    //connect comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to campgrounds show page
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });


});

//============
//AUTH ROUTES
//============

//Show register form
app.get('/register', function (req, res) {
    res.render('register');
});

//Handle sign up logic
app.post('/register', function (req, res) {

    var newUser = new User({username: req.body.username});

    User.register(newUser, req.body.password, function (err, user) {
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/campgrounds');
        });
    });
});

// show login form
app.get('/login', function (req, res) {
   res.render('login');
});

//handling login logic
app.post('/login', passport.authenticate('local',
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), function(req, res) {

});

//Logout route
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

//Setup listen port
app.listen(3000, function () {
    console.log('The YelpCamp Server has started!');
});