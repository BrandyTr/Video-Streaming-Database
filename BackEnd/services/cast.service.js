const Cast=require('../models/cast.model')
exports.createCast=async(personId,character,movieId)=>{
    const cast= new Cast({
        person_id:personId,
        character,
        movie_id:movieId,
    })
    try{
        await cast.save()
    }catch(err){
        console.log(err)
    }
}