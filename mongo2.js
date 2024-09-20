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

const Chat = require('./models/chat.js');

// Copy this code from mongoose site (Connecting with mongodb)
main()
.then(()=>{console.log("Connection successful!")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};


/// Get
app.get("/chats", async (req, res) => {
    try {
      let chats = await Chat.find();
      res.render("chat1.ejs", { chats });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
    //res.send("hello")
});


//POST
app.get('/chats/new', (req, res)=>{
  res.render("chat2.ejs");
});

app.post('/chats', (req, res)=>{
  let {from, to, message} = req.body;
  let chats = new Chat({
    from : from,
    to :to,
    message : message,
    created_at : new Date()
  });
  chats.save()
  .then((res)=>console.log("Chats have saved!"))
  res.redirect('/chats');
});


// PUT
app.get('/chats/:id/edit', async (req, res)=>{
  let {id} = req.params;
  let chats = await Chat.findById(id)
  res.render("chat3.ejs", {chats});
});

app.put('/chats/:id', async (req, res)=>{
  let {id} = req.params;
  let {message : newMsg} = req.body;
  let updated = await Chat.findByIdAndUpdate(id, {message : newMsg},
    {runValidators : true}, {new : true}
  );
  
  res.redirect("/chats");
});


//Delete
app.delete('/chats/:id', async (req, res)=>{
  let {id} = req.params;
  let chats = await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});



app.listen(PORT, (req, res)=>{
  console.log(`App is running on ${PORT}`);
});