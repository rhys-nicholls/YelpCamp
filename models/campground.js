var mongoose = require("mongoose");

//Setup schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

//Create model from schema
module.exports = mongoose.model('Campground', campgroundSchema);