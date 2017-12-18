var express             = require('express'),
    app                 = express(),
    bodyParser          = require('body-parser'),
    mongoose            = require('mongoose'),
    passport            = require('passport'),
    LocalStrategy       = require("passport-local");
    Campground          = require('./models/campground');
    Comment             = require('./models/comment');
    User                = require('./models/user');
    seedDb              = require('./seeds');

//Require route files
var commentRoutes       = require('./routes/comments'),
    campgroundRoutes    = require('./routes/campgrounds'),
    indexRoutes          = require('./routes/index');

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

app.use(function (req, res, next) {
   res.locals.currentUser = req.user;
   next();
});

//Express router
app.use(indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

//Setup listen port
app.listen(3000, function () {
    console.log('The YelpCamp Server has started!');
});