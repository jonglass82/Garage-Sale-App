var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/garage_sale")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


var listingSchema = new mongoose.Schema({
    address: String,
    town: String,
    image: String,
    description: String
});

var listing = mongoose.model("listing", listingSchema);


app.get("/", function(req,res){
    listing.find({},function(err,allListings){
        if(err){
            console.log(err);
        }else{
             res.render("index",{listings:allListings});
        }
    })
});

app.post("/", function(req,res){
   var address = req.body.address;
   var image = req.body.image;
   var town = req.body.town;
   var description = req.body.description;
   var newListing = {address:address, image:image, town:town, description: description};
   
  listing.create(newListing, function(err,newlyCreated){
      if(err){
          console.log(err);
      }else{
          res.redirect("/");
      }
  });
});

app.get("/new", function(req,res){
    res.render("new.ejs");
});

app.get("/:id", function(req,res){
    listing.findById(req.params.id, function(err,foundListing){
        if(err){
            console.log(err);
        }else{
           res.render("show", {listing:foundListing});
}
})
  });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server running");
});