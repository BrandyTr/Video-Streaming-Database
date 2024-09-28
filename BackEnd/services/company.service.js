const ProductionCompany = require('../models/productionCompany')
exports.createProductionCompany = async (name, logo_path, origin_country) => {
    let company = await ProductionCompany.findOne({ name })
    if (!company) {
        company = new ProductionCompany({
            name,
            logo_path,
            origin_country,
        })
        try {
            await company.save()
        } catch (err) {
            console.log(err)
        }
    }
    return company
}