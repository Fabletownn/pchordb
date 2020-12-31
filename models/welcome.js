const mongoose = require("mongoose");

const welcomeSchema = mongoose.Schema({
    guildID: String,
    welcomeMessage: String
});

module.exports = mongoose.model("welcome", welcomeSchema);