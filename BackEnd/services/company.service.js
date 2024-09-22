const ProductionCompany=require('../models/productionCompany')
exports.createProductionCompany=async(id,name,logo_path,origin_country)=>{
    const company= new ProductionCompany({
        id,
        name,
        logo_path,
        origin_country,
    })
    try{
        await company.save()
    }catch(err){
        console.log(err)
    }
}