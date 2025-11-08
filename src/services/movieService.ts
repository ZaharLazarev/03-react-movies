import axios, { AxiosRequestConfig } from "axios";
import { Movie } from "../types/movie";
interface movieServiceType {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const TMDB_BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDdjNWUwYjFmMzkzY2FhZWQ4YTE4YjU5ODcwYWY1MSIsIm5iZiI6MTcyNTgxMzE4My42MjYsInN1YiI6IjY2ZGRkMWJmYjcwY2M3ZjZmZDc4ODBjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B18nT--uizUGej7XJJdG0DEauMUSAGWsgxbbNtFOVx8";

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const TMDB_URL = "https://api.themoviedb.org/3/search/movie";
  const configurations: AxiosRequestConfig = {
    params: {
      query: query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
    },
  };
  const response = await axios.get<movieServiceType>(TMDB_URL, configurations);
  return response.data.results;
};
