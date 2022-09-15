const mongoose = require("mongoose");

const cartupdateSchema = new mongoose.Schema({

    ToDate: { type: String },
    Productcompany: { type: String },
    Productprice: { type: String },
    Quantity: { type: String },
    TotalAMount: { type: String },
    FromDate: { type: String },
    TooDate: { type: String }

});

module.exports = mongoose.model("cartupdate", cartupdateSchema);