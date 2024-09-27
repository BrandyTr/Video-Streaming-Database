const Credit = require("../models/credit.model")

exports.createCredit = async (castIds, crewIds) => {
    const credit = new Credit({
      casts: castIds,
      crews: crewIds,
    });
    await credit.save();
    return credit;
  };