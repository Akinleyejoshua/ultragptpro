const mongoose = require("mongoose");

const options = {
   
}
mongoose.set('strictQuery', false)
const MONGO_URI = "mongodb://127.0.0.1:27017/ultra-gpt";
const MONGO_URI_LIVE = "mongodb+srv://gemini:gemini1@cluster0.xyyujqk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connect = async () => {
    await mongoose.connect(MONGO_URI, options).then(res => {
        if (res) return console.log("Database Connected");
    }).catch(err => {
        console.log("MongoDB Database Connection Failed: " + err)
    })
}

module.exports = connect;
