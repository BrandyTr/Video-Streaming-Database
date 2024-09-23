const Video = require("../models/video.model")

exports.createVideo=async(id, name, key, site, published_at)=>{
    const video= new Video({
        id,
        name,
        key,
        site,
        published_at:new Date(published_at)
    })
    try{
        await video.save()
    }catch(err){
        console.log(err)
    }
}