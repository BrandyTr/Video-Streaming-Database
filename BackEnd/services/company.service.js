const ProductionCompany=require('../models/productionCompany')
exports.createProductionCompany=async(name,logo_path,origin_country)=>{
    const company= new ProductionCompany({
        name,
        logo_path,
        origin_country,
    })
    try{
        await company.save()
        return company
    }catch(err){
        console.log(err)
    }
}