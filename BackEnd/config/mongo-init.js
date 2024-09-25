print("Starting initialization script");
db = db.getSiblingDB('netflix');

// 1. Insert Genres

const actionGenre = db.genres.insertOne({ name: 'Action' }).insertedId;
const adventureGenre = db.genres.insertOne({ name: 'Adventure' }).insertedId;
const animationGenre = db.genres.insertOne({ name: 'Animation' }).insertedId;
const comedyGenre = db.genres.insertOne({ name: 'Comedy' }).insertedId;
const crimeGenre = db.genres.insertOne({ name: 'Crime' }).insertedId;
const documentaryGenre = db.genres.insertOne({ name: 'Documentary' }).insertedId;
const dramaGenre = db.genres.insertOne({ name: 'Drama' }).insertedId;
const fantasyGenre = db.genres.insertOne({ name: 'Fantasy' }).insertedId;
const historicalGenre = db.genres.insertOne({ name: 'Historical' }).insertedId;
const horrorGenre = db.genres.insertOne({ name: 'Horror' }).insertedId;
const musicalGenre = db.genres.insertOne({ name: 'Musical' }).insertedId;
const mysteryGenre = db.genres.insertOne({ name: 'Mystery' }).insertedId;
const romanceGenre = db.genres.insertOne({ name: 'Romance' }).insertedId;
const sciFiGenre = db.genres.insertOne({ name: 'Science Fiction' }).insertedId;
const sportGenre = db.genres.insertOne({ name: 'Sport' }).insertedId;
const supernaturalGenre = db.genres.insertOne({ name: 'Supernatural' }).insertedId;
const thrillerGenre = db.genres.insertOne({ name: 'Thriller' }).insertedId;
const warGenre = db.genres.insertOne({ name: 'War' }).insertedId;
const westernGenre = db.genres.insertOne({ name: 'Western' }).insertedId;

// 2. Insert Production Companies

const videos = [
    {
        name: "House of the Dead",
        key: "rGsXo6cjKyE",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2003-09-01")
    },
    {
        name: "The Child Remains",
        key: "ATi3GdospAo",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2017-08-01")
    },
    {
        name: "The Mist",
        key: "L2g0-wKhVkM",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2007-10-01")
    },
    {
        name: "Death Whisperer",
        key: "iR933CLpVtE",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2019-01-01")
    },
    {
        name: "The Conjuring 2",
        key: "WILGy6gTDMs",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2016-05-01")
    },
    {
        name: "Constantine",
        key: "N2zDRzNN_xg",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2005-01-01")
    },
    {
        name: "A Quiet Place Day One",
        key: "1M1t6Nr_p7s",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2024-01-01")
    },
    {
        name: "Snowpiercer",
        key: "mq6AQnYZ0-g",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2013-06-01")
    },
    {
        name: "Interstellar",
        key: "xkxnYxfrz4M",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2014-07-01")
    },
    {
        name: "Age of Tomorrow",
        key: "hhEqJONv7vE",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2014-04-01")
    },
    {
        name: "The Terminator",
        key: "x4cf_BDnXtY",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("1984-01-01")
    },
    {
        name: "Inception",
        key: "HSaQoVOFS1U",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2010-05-01")
    },
    {
        name: "Mr. Right",
        key: "V6ZrmUKH4Pk",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2023-01-01")
    },
    {
        name: "After The Storm",
        key: "Zvh_z8oHL98",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2019-05-01")
    },
    {
        name: "Cinderella in the Caribbean",
        key: "Rc6WrbiJwUM",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2021-06-01")
    },
    {
        name: "Retreat to Paradise",
        key: "PqWch8qwI_0",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2020-07-01")
    },
    {
        name: "Love in Tahiti",
        key: "0C67NvYVgpA",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2022-03-01")
    },
    {
        name: "Prescription for Love",
        key: "72gTHNo9b5E",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2019-09-01")
    },
    {
        name: "John Wick",
        key: "SB7omlBLDH4",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2014-10-01")
    },
    {
        name: "Hitman: Agent 47",
        key: "EEcDtb1wzjo",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2015-08-01")
    },
    {
        name: "Kingsman: The Secret Service",
        key: "JhvsyNfN8wo",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2015-02-01")
    },
    {
        name: "The November Man",
        key: "Tekt9lNDcuQ",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2014-08-01")
    },
    {
        name: "The Gangster, The Cop, The Devil",
        key: "msoXTAkDQjs",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("2019-05-01")
    },
    {
        name: "The Exorcist",
        key: "7vBL364GH1E",
        site: "YouTube",
        type: "full-time",
        published_at: new Date("1973-12-01")
    }
];
videos.forEach(video => db.videos.insertOne(video));  // Insert all video documents

// 3. Insert Movies with referenced genres and videos
const movies = [
    {
        title: "House of Dead",
        genres: [horrorGenre, actionGenre],
        videos: [db.videos.findOne({ key: "rGsXo6cjKyE" })._id],
        poster_path: "http://image.tmdb.org/t/p/w500/z2mDGbV4pLtsvSMNnmnSgoVZSWK.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/aNUEHLNsNMprLZt6fjf5nqDq6er.jpg",
        runtime: 90,
        release_date: new Date("2003-10-10")
    },
    {
        title: "The Child Remains",
        genres: [horrorGenre],
        videos: [db.videos.findOne({ key: "ATi3GdospAo" })._id],
        poster_path: "http://image.tmdb.org/t/p/w500/nb8wvkeC6wFSRApIHgD8zbMp9Sm.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/epxmvwqijbZpyUKqijf6V4X3O8W.jpg",
        runtime: 112,
        release_date: new Date("2017-10-06")
    },
    {
        title: "The Mist",
        genres: [horrorGenre, thrillerGenre],
        videos: [db.videos.findOne({ key: "L2g0-wKhVkM" })._id],
        poster_path: "http://image.tmdb.org/t/p/w500/1CvJ6diBACKPVGOpcWuY4XPQdqX.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/3WrR2rYX7nHWnBhWHLZptsJ2bEj.jpg",
        runtime: 126,
        release_date: new Date("2007-11-21")
    },
    {
        title: "Death Whisperer",
        genres: [horrorGenre, supernaturalGenre],
        videos: [db.videos.findOne({ key: "iR933CLpVtE" })._id],
        poster_path: "http://image.tmdb.org/t/p/w500/48TDjSJpCdJ4SBOHZX3G5IjaV02.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/55hRgXkbvHoc9dL58S9HAGyxmZt.jpg",
        runtime: 98,
        release_date: new Date("2019-02-28")
    },
    {
        title: "The Conjuring 2",
        genres: [horrorGenre, supernaturalGenre],
        videos: [db.videos.findOne({ key: "WILGy6gTDMs" })._id],
        poster_path: "http://image.tmdb.org/t/p/w500/zEqyD0SBt6HL7W9JQoWwtd5Do1T.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/3tMV2dYmvxMr511fD7Ap79tRFls.jpg",
        runtime: 134,
        release_date: new Date("2016-06-10")
    },
    {
        title: "Constantine",
        genres: [supernaturalGenre, thrillerGenre],
        videos: [db.videos.findOne({ key: "N2zDRzNN_xg" })._id],
        poster_path: "http://image.tmdb.org/t/p/w500/vPYgvd2MwHlxTamAOjwVQp4qs1W.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/tIG8FwHRiHLOlWJdizp2oxdkSL2.jpg",
        runtime: 121,
        release_date: new Date("2005-02-18")
    },
    {
        title: "A Quiet Place Day One",
        overview: "As New York City is invaded by alien creatures who hunt by sound, a woman named Sam fights to survive with her cat.",
        genres: [horrorGenre, thrillerGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "1M1t6Nr_p7s" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/hU42CRk14JuPEdqZG3AWmagiPAP.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/2RVcJbWFmICRDsVxRI8F5xRmRsK.jpg",
        runtime: 100,
        release_date: new Date("2024-03-08")
    },
    {
        title: "Snowpiercer",
        overview: "In a future where a failed global-warming experiment kills off most life on the planet, a class system evolves aboard the Snowpiercer, a train that travels around the globe via a perpetual-motion engine.",
        genres: [sciFiGenre, actionGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "mq6AQnYZ0-g" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/nzccOvhrLGI0nvAknCEAk8bchD9.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/33dV6HAnXBmwKl640gO3U4auqUN.jpg",
        runtime: 126,
        release_date: new Date("2013-08-01")
    },
    {
        title: "Interstellar",
        overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
        genres: [sciFiGenre, dramaGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "xkxnYxfrz4M" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
        runtime: 169,
        release_date: new Date("2014-11-07")
    },
    {
        title: "Age of Tomorrow",
        overview: "Mankind must fight to survive as Earth is invaded by hostile UFOs bent on destroying the planet.",
        genres: [sciFiGenre, actionGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "hhEqJONv7vE" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/rij2GSSXbhNLCFdvJN8YmRRD2i3.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/mL1FFG3NNk38aGzqXmlSEJyZgzE.jpg",
        runtime: 90,
        release_date: new Date("2014-06-10")
    },
    {
        title: "The Terminator",
        overview: "In the post-apocalyptic future, reigning tyrannical supercomputers teleport a cyborg assassin known as the 'Terminator' back to 1984 to kill Sarah Connor, whose unborn son is destined to lead insurgents against 21st century mechanical hegemony.",
        genres: [sciFiGenre, actionGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "x4cf_BDnXtY" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/qvktm0BHcnmDpul4Hz01GIazWPr.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/ffdqHMWkh1h9MABwIfbfRJhgFW6.jpg",
        runtime: 107,
        release_date: new Date("1984-10-26")
    },
    {
        title: "Inception",
        overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life as payment for a task considered to be impossible: inception, the implantation of another person's idea into a target's subconscious.",
        genres: [sciFiGenre, thrillerGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "HSaQoVOFS1U" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
        runtime: 148,
        release_date: new Date("2010-07-16")
    },
    {
        title: "Mr. Right",
        overview: "Mr. Right is a romantic comedy about a woman who meets a seemingly perfect man after several failed relationships. As their romance develops, she starts to question whether he's truly the right match for her.",
        genres: [romanceGenre, comedyGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "V6ZrmUKH4Pk" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/eLqoAoUOXgkEVqR1ji37Aew04Hy.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/lzwxUwE7i78mPJdWdDxtgQ8VP5K.jpg",
        runtime: 100,
        release_date: new Date("2023-01-01")
    },
    {
        title: "After The Storm",
        overview: "After The Storm follows a young woman coping with the aftermath of a personal tragedy. As she struggles with grief, she encounters new relationships that help her rediscover strength and hope.",
        genres: [dramaGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "Zvh_z8oHL98" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/Az6FT66SQJk1NUO8YSpsWcodzn.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/rp71qywIHgeqCQB6YAYrMt1MY3y.jpg",
        runtime: 115,
        release_date: new Date("2019-05-01")
    },
    {
        title: "Cinderella in the Caribbean",
        overview: "Cinderella in the Caribbean is a vibrant film reimagining the classic fairy tale set in the Caribbean. With magical help, Cinderella captivates a charming prince at a grand island ball.",
        genres: [fantasyGenre, romanceGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "Rc6WrbiJwUM" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/9QIiLG3hvpUTxh1Mzk1BaJW6km3.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/34x3aadeqyoyZilV5gIsjfIqG9s.jpg",
        runtime: 105,
        release_date: new Date("2021-06-01")
    },
    {
        title: "Retreat to Paradise",
        overview: "Retreat to Paradise is a heartwarming romantic movie about a young woman named Ellie who seeks solace in a countryside inn called Paradise. There, she meets a charming innkeeper and they embark on a journey of self-discovery.",
        genres: [romanceGenre, dramaGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "PqWch8qwI_0" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/5iwCeqvGK668jcW4igwqDH7lCtZ.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/wSTS0P6wJk03oqVRAwypLcXyojm.jpg",
        runtime: 120,
        release_date: new Date("2020-07-01")
    },
    {
        title: "Love in Tahiti",
        overview: "Love in Tahiti is a romantic film set in Tahiti. It follows a woman who travels for work but unexpectedly finds love, both with the island’s beauty and a local man.",
        genres: [romanceGenre, adventureGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "0C67NvYVgpA" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/5P2ktmVerHGJ4n9McCJ5Z3EVBJO.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/ceKQp2NVZXuaEIr7Dp44j8W7SA3.jpg",
        runtime: 98,
        release_date: new Date("2022-03-01")
    },
    {
        title: "Prescription for Love",
        overview: "Prescription for Love is a romantic comedy about a pharmacist named Claire who forms an unlikely relationship with a doctor named Luke. As they navigate their differences, they discover a deep connection.",
        genres: [romanceGenre, comedyGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "72gTHNo9b5E" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/cYOZQOG9umRyiyKxiDLaq4Puf0e.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/pNvSF67hVp7JuvhrZzSo11mgpi1.jpg",
        runtime: 110,
        release_date: new Date("2019-09-01")
    },
    {
        title: "John Wick",
        overview: "Ex-hitman John Wick comes out of retirement to track down the gangsters that took everything from him.",
        genres: [actionGenre, crimeGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "SB7omlBLDH4" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/ipyxbPJrLB1g9AfHq4xH5nLWmew.jpg",
        runtime: 101,
        release_date: new Date("2014-10-24")
    },
    {
        title: "Hitman: Agent 47",
        overview: "An assassin teams up with a woman to help her find her father and uncover the mysteries of her ancestry.",
        genres: [actionGenre, sciFiGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "EEcDtb1wzjo" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/52NXkgvzRYjRnqRPpqjpiwsIgRG.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/3gjYzFP2w2bx6srcZkfS667jnl0.jpg",
        runtime: 96,
        release_date: new Date("2015-08-21")
    },
    {
        title: "Kingsman: The Secret Service",
        overview: "The story of a super-secret spy organization that recruits an unrefined but promising street kid into the agency's ultra-competitive training program just as a global threat emerges from a twisted tech genius.",
        genres: [actionGenre, adventureGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "JhvsyNfN8wo" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/r6q9wZK5a2K51KFj4LWVID6Ja1r.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/1ZIeGwD2lMlLMr4u6IIR302jqhD.jpg",
        runtime: 129,
        release_date: new Date("2015-02-13")
    },
    {
        title: "The November Man",
        overview: "An ex-CIA operative is brought back in on a very personal mission and finds himself pitted against his former pupil in a deadly game involving high-level CIA officials and the Russian president-elect.",
        genres: [thrillerGenre, actionGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "Tekt9lNDcuQ" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/4ejNFbCgLMDAuy7jFQmc7cr6UAW.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/qFVv6qw6LqotUQofdwKSvxJfLnU.jpg",
        runtime: 108,
        release_date: new Date("2014-08-27")
    },
    {
        title: "The Gangster, The Cop, The Devil",
        overview: "After barely surviving a violent attack by an elusive serial killer, crime boss Jang Dong-su forms an unlikely partnership with local detective Jung Tae-seok to catch the sadistic killer simply known as K.",
        genres: [crimeGenre, thrillerGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "msoXTAkDQjs" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/oHlM4abRm6BzrRcz9Nup1uidw9H.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/fI6X3Hd8KvtAuOKVdmxckdNzrx.jpg",
        runtime: 110,
        release_date: new Date("2019-05-15")
    },
    {
        title: "The Exorcist",
        overview: "When a charming 12-year-old girl takes on the characteristics and voices of others, doctors say there is nothing they can do. Her mother realizes her daughter is possessed by the devil, and seeks help from two priests.",
        genres: [horrorGenre, supernaturalGenre],  // Assuming ObjectIds for genres
        videos: [db.videos.findOne({ key: "7vBL364GH1E" })._id],  // Referencing video ObjectId
        poster_path: "http://image.tmdb.org/t/p/w500/5x0CeVHJI8tcDx8tUUwYHQSNILq.jpg",
        backdrop_path: "http://image.tmdb.org/t/p/w500/xcjJ5khg2yzOa282mza39Lbrm7j.jpg",
        runtime: 122,
        release_date: new Date("1973-12-26")
    }
];
movies.forEach(movie => db.movies.insertOne(movie));  // Insert all movie documents

print("Initialization script completed.");
//1
// const brightlightPicturesId = ObjectId();
// db.productioncompanies.insertMany([
//     {
//         _id: brightlightPicturesId,
//         name: 'Brightlight Pictures',
//         logo_path: 'https://image.tmdb.org/t/p/w500/fpVBhNnopOZwGuF0gg99oBHp1ht.png',
//         origin_country: 'CA'
//     },
//     {
//         name: 'Mindfire Entertainment',
//         origin_country: 'US'
//     }
// ]);

// // 3. Insert Persons (Cast & Crew)
// const jonathanCherryId = ObjectId();
// const tyronLeitsoId = ObjectId();
// const uweBollId = ObjectId();
// const clintHowardId = ObjectId();
// const onaGrauerId = ObjectId();
// const ellieCornellId = ObjectId();
// const jurgenProchnowId = ObjectId();


// db.persons.insertMany([
//     { _id: jonathanCherryId, name: 'Jonathan Cherry', biography: 'Jonathan Cherry is a Canadian actor best known for his role as the lead in Goon (2011) and his performance in House of the Dead (2003).', profile_path: 'https://image.tmdb.org/t/p/w500/t6aBn5Dmu64XHxA6mdL5bwJ8Qx0.jpg' },
//     { _id: tyronLeitsoId, name: 'Tyron Leitso', biography: 'Tyron Leitso is a Canadian actor recognized for his work in Dinotopia (2002) and Wonderfalls (2004).', profile_path: 'https://image.tmdb.org/t/p/w500/97MInhXaUcN2uYnvcvjrzIKSJug.jpg' },
//     { _id: clintHowardId, name: 'Clint Howard', biography: 'Clint Howard is an American actor known for his distinctive appearances in films such as Apollo 13 and The Waterboy.', profile_path: 'https://image.tmdb.org/t/p/w500/6tugb8rz1hj8tYlSaSmUBD741fw.jpg' },
//     { _id: onaGrauerId, name: 'Ona Grauer', biography: 'Ona Grauer is a Canadian-Mexican actress widely recognized for her role in the TV series Stargate Universe.', profile_path: 'https://image.tmdb.org/t/p/w500/vfcupzwyzs1CNrjuG0wW4B3eQcD.jpg' },
//     { _id: ellieCornellId, name: 'Ellie Cornell', biography: 'Ellie Cornell is an American actress best known for her role as Rachel Carruthers in Halloween 4 and Halloween 5.', profile_path: 'https://image.tmdb.org/t/p/w500/yuS2DcheBpVKmVZKoYsB2pr7wBb.jpg' },
//     { _id: jurgenProchnowId, name: 'Jürgen Prochnow', biography: 'Jürgen Prochnow is a German actor famous for his role in Das Boot and Dune.', profile_path: 'https://image.tmdb.org/t/p/w500/4489XcYBPCY0CoqLHN04Bjz4A3q.jpg' },
//     { _id: uweBollId, name: 'Uwe Boll', biography: 'Uwe Boll is a German director, known for his work on video game adaptations.', profile_path: 'https://image.tmdb.org/t/p/w500/atLWExqv0Att2kiKXp6gKKtiwmD.jpg' }
// ]);

// // 4. Insert Video (Trailer)
// const videoId = ObjectId();
// db.videos.insertOne({
//     _id: videoId,
//     name: 'House of the Dead',
//     key: 'rGsXo6cjKyE',
//     official: true,
//     published_at: new Date('2003-09-15')
// });

// // 5. Insert Movie
// const movieId = ObjectId();
// db.movies.insertOne({
//     _id: movieId,
//     title: 'House of Dead',
//     overview: 'House of the Dead is a 2003 action horror film directed by Uwe Boll from a screenplay by Dave Parker and Mark Altman. Based on The House of the Dead video game franchise...',
//     release_date: new Date('2003-10-10'),
//     runtime: 90,
//     genres: [horrorGenre.insertedId],
//     production_companies: [brightlightPicturesId],
//     videos: [videoId]
// });

// // 6. Insert Cast & Crew Relationships
// db.casts.insertMany([
//     { person_id: jonathanCherryId, character: 'Rudy', movie_id: movieId },
//     { person_id: tyronLeitsoId, character: 'Simon', movie_id: movieId },
//     { person_id: clintHowardId, character: 'Salish', movie_id: movieId },
//     { person_id: onaGrauerId, character: 'Alicia', movie_id: movieId },
//     { person_id: ellieCornellId, character: 'Jordan', movie_id: movieId },
//     { person_id: jurgenProchnowId, character: 'Captain Victor', movie_id: movieId }
// ]);

// db.crews.insertOne({
//     person_id: uweBollId,
//     department: 'Directing',
//     movie_id: movieId
// });
