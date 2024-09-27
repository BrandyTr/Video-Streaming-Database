const Credit = require("../models/credit.model")

exports.createCredit=async(casts,crews,production_companies)=>{
    const credit = new Credit({
        casts,
        crews,
        production_companies,
    })
    try{
        credit.save()
        return credit
    }catch(err){
        console.log(err.message)
    }
}