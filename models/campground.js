var mongoose = require("mongoose");

//Setup schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//Create model from schema
module.exports = mongoose.model('Campground', campgroundSchema);