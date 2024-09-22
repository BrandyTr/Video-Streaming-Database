exports.createPerson = async (id, name, biography, birthday, place_of_birth) => {
    const person = new Person({
        id, 
        name,  
        biography,  
        birthday: new Date(birthday),  
        place_of_birth: place_of_birth,  
    });
    try{
        await person.save();
    }catch(err){
        console.log(err)
    }
}