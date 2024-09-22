exports.createPerson = async (name, biography) => {
    const person = new Person({
        name,  
        biography,  
    });
    try{
        await person.save();
    }catch(err){
        console.log(err)
    }
}