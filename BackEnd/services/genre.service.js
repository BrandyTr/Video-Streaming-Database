const Genre= require('../models/genre.model')
exports.createGenre=async(id,name)=>{
    const genre=new Genre({
        id,
        name,
    })
    try{
        await genre.save()
    }catch(err){
        console.log(err)
    }
}