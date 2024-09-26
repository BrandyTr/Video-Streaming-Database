const axios = require('axios');
const movieList = [
    { name: 'The Matrix', videoKey: 'm8e-FF8MsqU' },
    { name: 'Inception', videoKey: 'YoHD9XEInc0' },
    { name: 'Interstellar', videoKey: 'zSWdZVtXT7E' },
    { name: 'The Dark Knight', videoKey: 'EXeTwQWrcwY' },
    { name: 'Fight Club', videoKey: 'SUXWAEX2jlg' },
    { name: 'Forrest Gump', videoKey: 'bLvqoHBptjg' },
    { name: 'Pulp Fiction', videoKey: 's7EdQ4FqbhY' },
    { name: 'The Shawshank Redemption', videoKey: '6hB3S9bIaco' },
    { name: 'The Godfather', videoKey: 'sY1S34973zA' },
    { name: 'The Lord of the Rings: The Fellowship of the Ring', videoKey: 'V75dMMIW2B4' },
    { name: 'The Lord of the Rings: The Two Towers', videoKey: 'LbfMDwc4azU' },
    { name: 'The Lord of the Rings: The Return of the King', videoKey: 'r5X-hFf6Bwo' },
    { name: 'Gladiator', videoKey: 'owK1qxDselE' },
    { name: 'Avatar', videoKey: '5PSNL1qE6VY' },
    { name: 'Titanic', videoKey: '2e-eXJ6HgkQ' },
    { name: 'Star Wars: A New Hope', videoKey: 'vZ734NWnAHA' },
    { name: 'Jurassic Park', videoKey: 'lc0UehYemQA' },
    { name: 'The Avengers', videoKey: 'eOrNdBpGMv8' },
    { name: 'Guardians of the Galaxy', videoKey: 'd96cjJhvlMA' },
    { name: 'Black Panther', videoKey: 'xjDjIWPwcPU' },
    { name: 'Spider-Man: No Way Home', videoKey: 'JfVOs4VSpmA' },
    { name: 'Iron Man', videoKey: '8hYlB38asDY' },
    { name: 'Thor: Ragnarok', videoKey: 'ue80QwXMRHg' },
    { name: 'Doctor Strange', videoKey: 'Lt-U_t2pUHI' },
    { name: 'Avengers: Endgame', videoKey: 'TcMBFSGVi1c' },
    { name: 'Captain America: The First Avenger', videoKey: 'JerVrbLldXw' },
    { name: 'Deadpool', videoKey: 'ONHBaC-pfsk' },
    { name: 'Logan', videoKey: 'Div0iP65aZo' },
    { name: 'The Lion King', videoKey: '7TavVZMewpY' },
    { name: 'Frozen', videoKey: 'TbQm5doF_Uc' },
    { name: 'Moana', videoKey: 'LKFuXETZUsI' },
    { name: 'Toy Story', videoKey: 'KYz2wyBy3kc' },
    { name: 'Finding Nemo', videoKey: '2zLkasScy7A' },
    { name: 'Coco', videoKey: 'zNCz4mQzfEI' },
    { name: 'Shrek', videoKey: 'CwXOrWvPBPk' },
    { name: 'The Incredibles', videoKey: 'eZbzbC9285I' },
    { name: 'Madagascar', videoKey: 'dm-eiFVtRws' },
    { name: 'Kung Fu Panda', videoKey: 'PXi3Mv6KMzY' },
    { name: 'Despicable Me', videoKey: 'ZZv1vki4ou4' },
    { name: 'Minions', videoKey: 'eisKxhjBnZ0' },
    { name: 'Harry Potter and the Sorcerer\'s Stone', videoKey: 'VyHV0BRtdxo' },
    { name: 'Harry Potter and the Chamber of Secrets', videoKey: '1bq0qff4iF8' },
    { name: 'Harry Potter and the Prisoner of Azkaban', videoKey: 'lAxgztbYDbs' },
    { name: 'Harry Potter and the Goblet of Fire', videoKey: '3EGojp4Hh6I' },
    { name: 'Harry Potter and the Order of the Phoenix', videoKey: 'y6ZW7KXaXYk' },
    { name: 'Harry Potter and the Half-Blood Prince', videoKey: 'jpCPvHJ6p90' },
    { name: 'Harry Potter and the Deathly Hallows Part 1', videoKey: 'MxqsmsA8y5k' },
    { name: 'Harry Potter and the Deathly Hallows Part 2', videoKey: 'mObK5XD8udk' },
  ];
// Function to initialize movies
async function initMovies(movieList) {
  const url = 'http://localhost:3000/api/movie/create'; // Replace with your actual endpoint

  for (const movie of movieList) {
    try {
      const response = await axios.post(url, {
        movieName: movie.name,
        videoKey: movie.videoKey,
      });

      console.log(`Movie "${movie.name}" initialized successfully:`, response.data.message);
    } catch (error) {
      if (error.response) {
        // Server response with status code not in 2xx range
        console.error(`Failed to initialize movie "${movie.name}":`, error.response.data.message);
      } else if (error.request) {
        // No response received from server
        console.error(`No response for movie "${movie.name}":`, error.request);
      } else {
        // Error occurred while setting up the request
        console.error(`Error in setting up request for movie "${movie.name}":`, error.message);
      }
    }
  }
}

// List of movies to initialize


module.exports={initMovies,movieList}
// Initialize movies
