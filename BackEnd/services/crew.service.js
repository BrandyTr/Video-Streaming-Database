const Crew = require("../models/crew.model");
const { createOrUpdatePerson } = require("./person.service");
exports.createCrew=async(crewMember, movieId)=>{
    const person = await createOrUpdatePerson(crewMember); 
    const crew = new Crew({
      person_id: person._id,
      movie_id: movieId,
    });
    await crew.save();
    return crew;
}