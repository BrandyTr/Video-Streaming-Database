const Person=require('../models/person.model')
exports.createPerson = async (name, known_for_department,job,profile_path) => {
    const person = new Person({
        name,  
        known_for_department,  
        job,
        profile_path,
    });
    try{
        await person.save();
        return person
    }catch(err){
        console.log(err)
    }
}
exports.createOrUpdatePerson=async(personData)=> {
    let person = await Person.findOne({ name: personData.name });
    if (!person) {
      person = new Person({
        name: personData.name,
        known_for_department: personData.known_for_department,
        job: personData.job || "actor",
        profile_path: personData.profile_path || null,
      });
      await person.save();
    }
    return person;
  }