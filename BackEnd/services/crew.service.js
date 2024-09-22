const Crew = require("../models/crew.model")

exports.createCrew=async(personId, job, department, movieId)=>{
    const crew= new Crew({
        person_id:personId,
        job,
        movie_id:movieId
    })
    try{
        crew.save()
    }catch(err){
        console.log(err)
    }
}