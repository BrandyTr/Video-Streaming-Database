print("Starting initialization script");
db = db.getSiblingDB('netflix');

// 1. Insert Genres
const actionGenre = db.genres.insertOne({ name: 'Action' });
const adventureGenre = db.genres.insertOne({ name: 'Adventure' });
const animationGenre = db.genres.insertOne({ name: 'Animation' });
const dramaGenre = db.genres.insertOne({ name: 'Drama' });
const horrorGenre = db.genres.insertOne({ name: 'Horror' });
const romanceGenre = db.genres.insertOne({ name: 'Romance' });
const sciFiGenre = db.genres.insertOne({ name: 'Science Fiction' });
const thrillerGenre = db.genres.insertOne({ name: 'Thriller' });

// 2. Insert Production Companies
const brightlightPicturesId = ObjectId();
db.productioncompanies.insertMany([
    {
        _id: brightlightPicturesId,
        name: 'Brightlight Pictures',
        logo_path: 'https://image.tmdb.org/t/p/w500/fpVBhNnopOZwGuF0gg99oBHp1ht.png',
        origin_country: 'CA'
    },
    {
        name: 'Mindfire Entertainment',
        origin_country: 'US'
    }
]);

// 3. Insert Persons (Cast & Crew)
const jonathanCherryId = ObjectId();
const tyronLeitsoId = ObjectId();
const uweBollId = ObjectId();
const clintHowardId = ObjectId();
const onaGrauerId = ObjectId();
const ellieCornellId = ObjectId();
const jurgenProchnowId = ObjectId();

db.persons.insertMany([
    { _id: jonathanCherryId, name: 'Jonathan Cherry', biography: 'Jonathan Cherry is a Canadian actor best known for his role as the lead in Goon (2011) and his performance in House of the Dead (2003).', profile_path: 'https://image.tmdb.org/t/p/w500/t6aBn5Dmu64XHxA6mdL5bwJ8Qx0.jpg' },
    { _id: tyronLeitsoId, name: 'Tyron Leitso', biography: 'Tyron Leitso is a Canadian actor recognized for his work in Dinotopia (2002) and Wonderfalls (2004).', profile_path: 'https://image.tmdb.org/t/p/w500/97MInhXaUcN2uYnvcvjrzIKSJug.jpg' },
    { _id: clintHowardId, name: 'Clint Howard', biography: 'Clint Howard is an American actor known for his distinctive appearances in films such as Apollo 13 and The Waterboy.', profile_path: 'https://image.tmdb.org/t/p/w500/6tugb8rz1hj8tYlSaSmUBD741fw.jpg' },
    { _id: onaGrauerId, name: 'Ona Grauer', biography: 'Ona Grauer is a Canadian-Mexican actress widely recognized for her role in the TV series Stargate Universe.', profile_path: 'https://image.tmdb.org/t/p/w500/vfcupzwyzs1CNrjuG0wW4B3eQcD.jpg' },
    { _id: ellieCornellId, name: 'Ellie Cornell', biography: 'Ellie Cornell is an American actress best known for her role as Rachel Carruthers in Halloween 4 and Halloween 5.', profile_path: 'https://image.tmdb.org/t/p/w500/yuS2DcheBpVKmVZKoYsB2pr7wBb.jpg' },
    { _id: jurgenProchnowId, name: 'Jürgen Prochnow', biography: 'Jürgen Prochnow is a German actor famous for his role in Das Boot and Dune.', profile_path: 'https://image.tmdb.org/t/p/w500/4489XcYBPCY0CoqLHN04Bjz4A3q.jpg' },
    { _id: uweBollId, name: 'Uwe Boll', biography: 'Uwe Boll is a German director, known for his work on video game adaptations.', profile_path: 'https://image.tmdb.org/t/p/w500/atLWExqv0Att2kiKXp6gKKtiwmD.jpg' }
]);

// 4. Insert Video (Trailer)
const videoId = ObjectId();
db.videos.insertOne({
    _id: videoId,
    name: 'House of the Dead Trailer',
    key: 'rGsXo6cjKyE',
    official: true,
    published_at: new Date('2003-09-15')
});

// 5. Insert Movie
const movieId = ObjectId();
db.movies.insertOne({
    _id: movieId,
    title: 'House of Dead',
    overview: 'House of the Dead is a 2003 action horror film directed by Uwe Boll from a screenplay by Dave Parker and Mark Altman. Based on The House of the Dead video game franchise...',
    release_date: new Date('2003-10-10'),
    runtime: 90,
    genres: [horrorGenre.insertedId],
    production_companies: [brightlightPicturesId],
    videos: [videoId]
});

// 6. Insert Cast & Crew Relationships
db.casts.insertMany([
    { person_id: jonathanCherryId, character: 'Rudy', movie_id: movieId },
    { person_id: tyronLeitsoId, character: 'Simon', movie_id: movieId },
    { person_id: clintHowardId, character: 'Salish', movie_id: movieId },
    { person_id: onaGrauerId, character: 'Alicia', movie_id: movieId },
    { person_id: ellieCornellId, character: 'Jordan', movie_id: movieId },
    { person_id: jurgenProchnowId, character: 'Captain Victor', movie_id: movieId }
]);

db.crews.insertOne({
    person_id: uweBollId,
    department: 'Directing',
    movie_id: movieId
});
