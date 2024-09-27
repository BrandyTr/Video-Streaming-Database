const Crew = require("../models/crew.model")

exports.createCrew=async(crewMember, movieId)=>{
    const person = await createOrUpdatePerson(crewMember); // Create or update person first
    const crew = new Crew({
      person_id: person._id,
      movie_id: movieId,
    });
    await crew.save();
    return crew._id;
}