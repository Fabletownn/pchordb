const mongoose = require("mongoose");

const GTBSchema = mongoose.Schema({
    guildID: String,
    attachs1: String,
    answer1: String,
    attachs2: String,
    answer2: String,
    attachs3: String,
    answer3: String,
    attachs4: String,
    answer4: String,
    attachs5: String,
    answer5: String,
    attachs6: String,
    answer6: String,
    attachs7: String,
    answer7: String,
    attachs8: String,
    answer8: String,
    attachs9: String,
    answer9: String,
    attachs10: String,
    answer10: String,
    attachs11: String,
    answer11: String,
    attachs12: String,
    answer12: String,
    attachs13: String,
    answer13: String,
    attachs14: String,
    answer14: String,
    attachs15: String,
    answer15: String,
    attachs16: String,
    answer16: String,
    attachs17: String,
    answer17: String,
    attachs18: String,
    answer18: String,
    attachs19: String,
    answer19: String,
    attachs20: String,
    answer20: String
});

module.exports = mongoose.model("GTB", GTBSchema);