const mongoose = require("mongoose");

const PointSchema = mongoose.Schema({
    serverID: String,
    userID: String,
    name: String,
    points: Number,
    lb: String
})

module.exports = mongoose.model("PNT", PointSchema);