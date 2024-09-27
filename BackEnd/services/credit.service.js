const Credit = require("../models/credit.model")

exports.createCredit = async (castIds, crewIds,ProductionCompanyIds) => {
    const credit = new Credit({
      casts: castIds,
      crews: crewIds,
      production_companies:ProductionCompanyIds,
    });
    await credit.save();
    return credit;
  };