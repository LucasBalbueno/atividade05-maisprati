import { useState } from 'react';
import { getMovie } from '../../../services/MovieSearch';
import { Container, Title, Input, Button, MoviesContainer, MovieCard } from './style';

const MovieSearchEngine = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [ error, setError ] = useState('');

  const searchMovies = async () => {
    try {
      setError('');
      const { data } = await getMovie(query);

      if ( data.Response === "True" ) {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError('Nenhum filme foi encontrado com esse nome!')

        error && alert('Nenhum filme foi encontrado com esse nome!')
      }
    } catch (error) {
      console.error("Erro ao buscar as informações do filme:", error);
      setError("Não foi possível encontrar um filme com esse nome, tente novamente!")
    }
  };

  return (
    <Container>
      <Title>Movie Search Engine</Title>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie"
      />
      <Button onClick={searchMovies}>Search</Button>
      <MoviesContainer>
        {movies && movies.map((movie) => (
          <MovieCard key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} Poster`} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </MovieCard>
        ))}
      </MoviesContainer>
    </Container>
  );
};

export default MovieSearchEngine;