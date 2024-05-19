const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  history_id: String,
  chats: Array,
  evaluation: String,
})

module.exports = mongoose.models.chat || mongoose.model("chat", chatSchema);;