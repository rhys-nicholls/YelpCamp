var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor amet quinoa vexillologist mlkshk iceland glossier cardigan banh mi, bicycle rights offal before they sold out actually authentic green juice readymade. Street art occupy selfies small batch la croix. Vexillologist selfies leggings meggings actually fam. Blog XOXO kitsch knausgaard ennui migas af art party artisan pour-over. Tote bag gastropub DIY, brunch offal echo park pug next level. Whatever small batch retro, four loko cliche lyft wayfarers PBR&B."
    },
    {
        name: "Desert Mesa",
        image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
        description: "Lorem ipsum dolor amet quinoa vexillologist mlkshk iceland glossier cardigan banh mi, bicycle rights offal before they sold out actually authentic green juice readymade. Street art occupy selfies small batch la croix. Vexillologist selfies leggings meggings actually fam. Blog XOXO kitsch knausgaard ennui migas af art party artisan pour-over. Tote bag gastropub DIY, brunch offal echo park pug next level. Whatever small batch retro, four loko cliche lyft wayfarers PBR&B."
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor amet quinoa vexillologist mlkshk iceland glossier cardigan banh mi, bicycle rights offal before they sold out actually authentic green juice readymade. Street art occupy selfies small batch la croix. Vexillologist selfies leggings meggings actually fam. Blog XOXO kitsch knausgaard ennui migas af art party artisan pour-over. Tote bag gastropub DIY, brunch offal echo park pug next level. Whatever small batch retro, four loko cliche lyft wayfarers PBR&B."
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Harry Potter"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        });
                }
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
