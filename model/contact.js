const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    customername: { type: String, default: null },
    customercontactno: { type: String, default: null },
    productname: { type: String },
});

module.exports = mongoose.model("productrentalcontact", contactSchema);