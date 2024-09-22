print("Starting initialization script");
db = db.getSiblingDB('netflix');

// 1. Insert Genre
const actionGenre = db.genres.insertOne({ name: 'Action' });
const adventureGenre = db.genres.insertOne({ name: 'Adventure' });
const animationGenre = db.genres.insertOne({ name: 'Animation' });
const dramaGenre = db.genres.insertOne({ name: 'Drama' });
const horrorGenre = db.genres.insertOne({ name: 'Horror' });
const romanceGenre = db.genres.insertOne({ name: 'Romance' });
const sciFiGenre = db.genres.insertOne({ name: 'Science Fiction' });
const thrillerGenre = db.genres.insertOne({ name: 'Thriller' });

// 2. Insert Production Company
db.productioncompanies.insertOne({
    _id: ObjectId(),
    name: 'Artisan Entertainment',
    logo_path: '/artisan-logo.png',
    origin_country: 'US'
});

// 3. Insert Persons (Cast & Crew)
const jonathanCherryId = ObjectId();
const tyronLeitsoId = ObjectId();
const uweBollId = ObjectId();

db.persons.insertMany([
    { _id: jonathanCherryId, name: 'Jonathan Cherry', biography: 'An actor...', birthday: new Date('1978-12-03'), place_of_birth: 'Montreal, Canada' },
    { _id: tyronLeitsoId, name: 'Tyron Leitso', biography: 'An actor...', birthday: new Date('1976-01-01'), place_of_birth: 'Vancouver, Canada' },
    { _id: uweBollId, name: 'Uwe Boll', biography: 'A German director...', birthday: new Date('1965-06-22'), place_of_birth: 'Wermelskirchen, Germany' }
]);

// 4. Insert Video (Trailer)
const videoId = ObjectId();
db.videos.insertOne({
    _id: videoId,
    name: 'House of Dead Trailer',
    key: 'rGsXo6cjKyE',
    site: 'YouTube',
    type: 'Trailer',
    official: true,
    published_at: new Date('2003-09-15')
});

// 5. Insert Movie
const movieId = ObjectId();
db.movies.insertOne({
    _id: movieId,
    title: 'House of Dead',
    overview: 'A group of college students...',
    release_date: new Date('2003-10-10'),
    runtime: 90,
    genres: [horrorGenre.insertedId],
    production_companies: [db.productioncompanies.findOne({ name: 'Artisan Entertainment' })._id],
    videos: [videoId]
});

// 6. Insert Cast & Crew Relationships
db.casts.insertMany([
    { person_id: jonathanCherryId, character: 'Rudy', movie_id: movieId },
    { person_id: tyronLeitsoId, character: 'Simon', movie_id: movieId }
]);

db.crews.insertOne({ person_id: uweBollId, job: 'Director', department: 'Directing', movie_id: movieId });

