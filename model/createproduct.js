const mongoose = require("mongoose");

const createproductSchema = new mongoose.Schema({
    ProductName: { type: String },
    Productcompany: { type: String },
    Productprice: { type: String }, 
    minHours: { type: String },
    minPrice: { type: String },
    image: { type: String },
    Quantity:{ type: String },
    Hours:{ type: String },
    TotalAMount:{ type: String },
});

module.exports = mongoose.model("createproduct", createproductSchema);