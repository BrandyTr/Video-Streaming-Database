const Genre = require('../models/genre.model');

exports.createGenre = async (genreName) => {
  try {
    let genre = await Genre.findOne({ name: genreName });

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
