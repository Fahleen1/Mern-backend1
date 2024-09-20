const express = require('express');
const app = express();

const PORT = 3000;

const path = require('path');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

// Require mongoose
const mongoose = require('mongoose');

//Method override
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Copy this code from mongoose site (Connecting with mongodb)
main()
.then(()=>{console.log("Connection successful!")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
};


/// Creating schema
// const userSchema = new mongoose.Schema({
//     name:String,
//     email:String,
//     age:Number
// });

/// Creating Model
//const User = mongoose.model("User", userSchema);

/// Adding data
// const user1 = new User({
//     name : "Ellen",
//     email : "ellen@gmail.com",
//     age : 21
// });
// user1.save();

// User.insertMany([{name: "Ally", email:"ally@gmail.com", age:19},
//     {name: "Emma", email:"emma@gmail.com", age:29}
// ]);

/// Find
// User.find({age : {$gt : 20}})
// .then((res)=>{console.log(res)});

/// Update
// User.findByIdAndUpdate({_id:"66eae86fda4385fc02541035"}, {age:22}, {new : true})
// .then((res)=>{console.log(res)});

// User.findOneAndUpdate({_id:"66eae86fda4385fc02541035"},{name: "Ellen", age:30, new:true})
// .then(res=>console.log(res));




app.listen(PORT, (req, res)=>{
    console.log(`App is running on ${PORT}`);
});