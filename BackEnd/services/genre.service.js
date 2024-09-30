const Genre = require('../models/genre.model');

exports.createGenre = async (genreName) => {
  try {
    // Find the genre by name
    let genre = await Genre.findOne({ name: genreName });

    // If the genre does not exist, create a new one
    if (!genre) {
      genre = new Genre({ name: genreName });
      await genre.save();
    }

    return genre;
  } catch (err) {
    console.error('Error creating or finding genre:', err.message);
    throw new Error('Failed to create or retrieve genre');
  }
};
