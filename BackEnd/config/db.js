const mongoose = require('mongoose');
const ENV_VARS = require('./vars');
const connect= async()=>{
    try{
        const ok=await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log('Connect successfully')
    }
    catch(err){
        console.log(err)
    }

}
module.exports={connect}