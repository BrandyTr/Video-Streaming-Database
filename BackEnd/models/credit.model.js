const mongoose= require('mongoose')
const Schema= mongoose.Schema
const CreditSchema= new Schema({
    casts: [{ type: Schema.Types.ObjectId, ref: 'Cast',default:[] }],  // One-to-many
    crews: [{ type: Schema.Types.ObjectId, ref: 'Crew',default:[] }], 
    production_companies: [{ type: Schema.Types.ObjectId, ref: 'ProductionCompany' ,default:[]}],  // Many-to-many // One-to-many
})
const Credit=mongoose.model('Credit',CreditSchema)
module.exports=Credit