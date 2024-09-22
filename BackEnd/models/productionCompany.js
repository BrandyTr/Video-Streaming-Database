const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProductionCompanySchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    logo_path: String,
    origin_country: String,
});
const ProductionCompany = mongoose.model('ProductionCompany', ProductionCompanySchema);
module.exports = ProductionCompany;
