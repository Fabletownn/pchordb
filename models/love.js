const mongoose = require("mongoose");

const luvSchema = mongoose.Schema({
    guildID: String,
    latestMember: String,
    loves: Number
});

module.exports = mongoose.model("loves", luvSchema);