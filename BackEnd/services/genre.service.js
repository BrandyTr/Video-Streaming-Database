const Genre= require('../models/genre.model')
exports.createGenre=async(name)=>{
    const genre=new Genre({
        name,
    })
    try{
        await genre.save()
    }catch(err){
        console.log(err)
    }
}