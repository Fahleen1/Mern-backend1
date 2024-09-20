// Require express first
const express = require('express');
const app = express();

const PORT = 3000;

// Resolve  path when not using ejs just returning html files
const {resolve} = require('path');
app.use(express.static('static'));

const path = require('path');

// EJS
app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "/views"));

// To access css files
// app.use(express.static("static"));  //OR
app.set(express.static(path.join(__dirname, "public")));

// Middleware for handling POST requests
app.use(express.urlencoded({ extended: true }));

// Middleware to parse json data i.e displaying post data
app.use(express.json());

// app.get('/', (req,res)=>{
//     res.send("App is working!!")
// });

app.get('/', (req,res)=>{
    res.sendFile(resolve(__dirname, 'index.html'));
});

// app.get('/', (req,res)=>{
//     res.sendFile(resolve(__dirname, 'views/form.html'));
// });

app.get('/user', (req,res)=>{
    res.send("User route is working");
});

// app.get('/user/:user_id', (req,res)=>{
//     let {user_id} = req.params;
//     console.log(user_id)
//     res.send(`User route is working with ${user_id}`);
// });

// app.get('/:user/:user_id', (req,res)=>{
//     let {user, user_id} = req.params;
//     res.send(`<h2>${user} with ${user_id}</h2>`);
// });

app.get('/search', (req,res)=>{   //e.g search?q=apple in URL
    let {q} = req.query;
    console.log(q);
});

app.post('/adduser', (req, res)=>{
    let {name, age} = req.body;
    res.send(`Name ${name} with age ${age}`);
});
// {
//     "name": "John",
//     "age": 25
//  }
  
// Get and Post requests in form
app.get('/getInfo', (req,res)=>{
    let {name, uname} = req.query;
    console.log('Received GET request with query:',name);
    res.send(`${name} with username: ${uname}`);
});

app.post('/postInfo', (req,res)=>{
    let {name, uname} = req.body;
    console.log('Received Post request with query:',name);
    res.send(`Request is received ${name} and username ${uname}`)
});


// EJS Use
app.get('/ejs', (req, res)=>{
    let fruits = ['apple', 'mango', 'peach'];
    res.render('home.ejs', {fruits});
});

app.get('/rolldice', (req, res)=>{
    let roll = Math.floor(Math.random()*6)+1;
    res.render('rolldice.ejs', {roll});
});

app.get('/insta/:username', (req, res)=>{
    let followers = ["Adam", "Will", "Selena", "Jennifer"];
    let {username} = req.params;
    res.render('instagram.ejs', { username,followers});
});

// Testing the port
app.listen(PORT, ()=>{
    console.log(`App is listening on ${PORT}`);
});


// Use thunderclient for testing!!!