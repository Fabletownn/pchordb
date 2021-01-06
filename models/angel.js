const mongoose = require("mongoose");

const angelSchema = mongoose.Schema({
    guildID: String,
    angelPings: Number,
});

module.exports = mongoose.model("angel", angelSchema);