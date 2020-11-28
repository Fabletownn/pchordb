const mongoose = require("mongoose");

const prefSchema = mongoose.Schema({
    guildID: String,
    botPrefix: String
});

module.exports = mongoose.model("PREF", prefSchema);