const axios = require('axios');
const Settings = require('../models/setting.model');
const movieList = [
    { name: 'House of Dead', videoKey: 'rGsXo6cjKyE' },
    { name: 'The Child Remains', videoKey: 'ATi3GdospAo' },
    { name: 'The Mist', videoKey: 'L2g0-wKhVkM' },
    { name: 'Death Whisperer', videoKey: 'iR933CLpVtE' },
    { name: 'The Conjuring 2', videoKey: 'WILGy6gTDMs' },
    { name: 'The Exorcist', videoKey: '7vBL364GH1E' },
    { name: 'A quiet place day one', videoKey: '1M1t6Nr_p7s' },
    { name: 'snowpiercer', videoKey: 'mq6AQnYZ0-g' },
    { name: 'Interstellar', videoKey: 'xkxnYxfrz4M' },
    { name: 'Age of tomorrow', videoKey: 'hhEqJONv7vE' },
    { name: 'The Terminator', videoKey: 'HSaQoVOFS1U' },
    { name: 'Inception', videoKey: 'r5X-hFf6Bwo' },
    { name: 'Mr Right', videoKey: 'V6ZrmUKH4Pk' },
    { name: 'After The Storm', videoKey: 'Zvh_z8oHL98' },
    { name: 'Cinderella in the Caribbean', videoKey: 'Rc6WrbiJwUM' },
    { name: 'Retreat to Paradise', videoKey: 'PqWch8qwI_0' },
    { name: 'Love in Tahiti', videoKey: '0C67NvYVgpA' },
    { name: 'Prescription for Love', videoKey: '72gTHNo9b5E' },
    { name: 'John Wick', videoKey: 'SB7omlBLDH4' },
    { name: 'Hitman: Agent 47', videoKey: 'EEcDtb1wzjo' },
    { name: 'Kingsman: The Secret Service', videoKey: 'JhvsyNfN8wo' },

  ];

async function initMovies(movieList) {
  const initialized = await Settings.findOne({ key: 'moviesInitialized' });
  if (initialized && initialized.value === 'true') {
    console.log('Movies have already been initialized.');
    return; 
  }
  const url = 'http://localhost:3000/api/movie/create'; 

  for (const movie of movieList) {
    try {
      const response = await axios.post(url, {
        movieName: movie.name,
        videoKey: movie.videoKey,
      });

      console.log(`Movie "${movie.name}" initialized successfully:`, response.data.message);
    } catch (error) {
      if (error.response) {
        console.error(`Failed to initialize movie "${movie.name}":`, error.response.data.message);
      } else if (error.request) {
        console.error(`No response for movie "${movie.name}":`, error.request);
      } else {
        console.error(`Error in setting up request for movie "${movie.name}":`, error.message);
      }
    }
  }
  await Settings.updateOne({ key: 'moviesInitialized' }, { value: 'true' }, { upsert: true });
}



module.exports={initMovies,movieList}

