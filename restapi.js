const express = require('express');
const app = express();

const PORT = 3000;

const path = require('path');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

//Method override
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

// UUID
const { v4: uuidv4 } = require('uuid');

let posts = [
    {
        id:uuidv4(),
        username: "misha123",
        content: "I love development"
    },
    {
        id:uuidv4(),
        username: "mahi3",
        content: "I'm business student"
    },
    {
        id:uuidv4(),
        username: "elly65",
        content: "I love psychology"
    }
];

// GET 
app.get('/posts', (req, res)=>{
    res.render("rest1.ejs", {posts});
});

// POST
app.get('/posts/new', (req, res)=>{
    res.render("rest2.ejs");
});

app.post('/posts', (req, res)=>{
    //console.log("Post working");
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

// See in detail
app.get('/posts/:id', (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("rest3.ejs", {post});
});

/// PATCH
app.get('/posts/:id/edit', (req, res) => {
    let id = req.params.id;
    let post = posts.find((p) => id === p.id);
    res.render("rest4.ejs", { post });
});

app.patch('/posts/:id', (req, res) => {
    let id = req.params.id;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
});


/// DELETE
app.delete("/posts/:id", (req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id!==p.id);
    res.redirect("/posts")
});


app.listen(PORT, (req, res)=>{
    console.log(`App is running on ${PORT}`);
});