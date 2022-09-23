const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Role:{ type: String, default: null },
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    blogs: [{ type: mongoose.Types.ObjectId, ref: "productrentalproduct", required: true }],
    token: { type: String },
});

module.exports = mongoose.model("productrentaluser", userSchema);