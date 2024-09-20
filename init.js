const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main()
.then(()=>{
    console.log("connection succeeded!")

})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chats = [
    {
        from: "Maham",
        to: "Misha",
        message: "Hi, what's up?",
        created_at: new Date()
    },
    {
        from: "Ellen",
        to: "Will",
        message: "Hello",
        created_at: new Date()
    },
    {
        from: "Maham",
        to: "Maya",
        message: "Send me notes plz!",
        created_at: new Date()
    }
]

Chat.insertMany(chats);