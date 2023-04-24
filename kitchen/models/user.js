const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    name: String,
    spotifyAccessToken: String,
    spotifyAccessTokenHash: String
})

module.exports = mongoose.model("user", userSchema);