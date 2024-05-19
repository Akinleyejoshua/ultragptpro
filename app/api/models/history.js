const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  title: String,
  path: String,
  name: String,
  role: String,
  role_id: String,
})

module.exports = mongoose.models.history || mongoose.model("history", historySchema);