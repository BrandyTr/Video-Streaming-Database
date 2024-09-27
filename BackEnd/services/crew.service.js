const Crew = require("../models/crew.model")

exports.createCrew=async(personId, movieId)=>{
    const crew= new Crew({
        person_id:personId,
        movie_id:movieId
    })
    try{
        crew.save()
    }catch(err){
        console.log(err)
    }
}