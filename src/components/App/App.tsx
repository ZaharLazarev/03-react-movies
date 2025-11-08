import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import { Movie } from "../../types/movie";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const movieSubmit = async (query: string) => {
    try {
      setError(false);
      setLoading(true);
      const data = await fetchMovies(query);
      setMovies(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      if (movies.length === 0) {
        toast("No movies found for your request.");
      }
    }
  };

  const movieClick = (movie: Movie | null) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <SearchBar onSubmit={movieSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid onClick={movieClick} movies={movies} />}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => {
            movieClick(null);
          }}
        />
      )}
      <Toaster />
    </>
  );
}

export default App;
