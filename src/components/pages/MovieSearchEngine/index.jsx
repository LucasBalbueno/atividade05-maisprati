import { useState } from 'react'; // Importa o hook useState do React
import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

import { Container, Title, Input, Button, MoviesContainer, MovieCard } from './style';

// Componente principal MovieSearchEngine
const MovieSearchEngine = () => {
  const [query, setQuery] = useState(''); // Define o estado para a consulta de busca
  const [movies, setMovies] = useState([]); // Define o estado para armazenar os filmes

  // Função para buscar filmes
  const searchMovies = async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=403abbfe`); // Faz uma requisição GET para a API OMDB
      setMovies(response.data.Search); // Armazena os dados dos filmes no estado movies
    } catch (error) {
      console.error("Error fetching movie data:", error); // Exibe um erro no console em caso de falha
    }
  };

  return (
    <Container>
      <Title>Movie Search Engine</Title>
      <Input
        type="text"
        value={query} // Valor do campo de entrada é ligado ao estado query
        onChange={(e) => setQuery(e.target.value)} // Atualiza o estado query conforme o usuário digita
        placeholder="Search for a movie" // Placeholder do campo de entrada
      />
      <Button onClick={searchMovies}>Search</Button> {/* Botão que chama a função searchMovies quando clicado */}
      <MoviesContainer>
        {movies && movies.map((movie) => ( // Verifica se há filmes e os mapeia para exibir MovieCard
          <MovieCard key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} Poster`} /> {/* Exibe o pôster do filme */}
            <h3>{movie.Title}</h3> {/* Exibe o título do filme */}
            <p>{movie.Year}</p> {/* Exibe o ano do filme */}
          </MovieCard>
        ))}
      </MoviesContainer>
    </Container>
  );
};

export default MovieSearchEngine; // Exporta o componente MovieSearchEngine como padrão
