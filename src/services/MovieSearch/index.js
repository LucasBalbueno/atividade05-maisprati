import axios from "axios";

export const getMovie = (movieName) => {
    return axios.get(`http://www.omdbapi.com/?s=${movieName}&apikey=4d983622`);
};