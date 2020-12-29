const mongoose = require("mongoose");

const pubSchema = mongoose.Schema({
    guildID: String,
    channelList: String,
});

module.exports = mongoose.model("PUB", pubSchema);