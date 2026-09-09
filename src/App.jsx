import React, { useEffect, useState } from 'react'
import Search from './components/search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import {useDebounce} from 'react-use'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [errorMessage, seterrorMessage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    seterrorMessage(null);

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);   

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        seterrorMessage('No movies found.');
        setMovies([]);
        return;
      }

      setMovies(data.results);

    } catch (error) {
      console.error('Error fetching movies:', error);
      seterrorMessage('Failed to fetch movies. Please check your API Key in .env file.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div>
        <header className="flex flex-col items-center text-center">
          <img src="./bannerimg.png" alt="Movie Poster" className="mx-auto w-200 h-auto mb-6"/>
          <h1 className="text-6xl font-bold mb-7">
            Find your next favorite <span className="text-gradient">movie</span>
          </h1>
        </header>

        <div>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <section className="mt-8">
          <h2 className="text-4xl font-bold mb-15 mt-15 ml-4">All Movies</h2>
          
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
        </section>
      </div>
    </main>
  )
}

export default App