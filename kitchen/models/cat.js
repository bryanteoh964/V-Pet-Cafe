const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catSchema = new Schema({
    name: String,
    stats: {
        happy: Number,
        full: Number,
        awake: Number
    }
})

module.exports = mongoose.model("cat", catSchema);