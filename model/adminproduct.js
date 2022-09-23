const mongoose = require("mongoose");

const AdminproductSchema = new mongoose.Schema({
    ProductName: { type: String },
    Productcompany: { type: String },
    Productprice: { type: String },
    Quantity: { type: String },
    Hours: { type: String },
    TotalAMount: { type: String },
    FromDate: { type: String },
    ToDate: { type: String },
});

module.exports = mongoose.model("productrentaladminproduct", AdminproductSchema);


