export { Navbar, Footer, Card } from "./components";
export { Logos } from "./constants";

export const image_API = {
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
