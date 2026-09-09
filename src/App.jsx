import React from 'react'
import {useEffect, useState} from 'react'
import Search from './components/search'
import Spinner from './components/Spinner'

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
  const [searchTerm, setSearchTerm] = React.useState('');

  const [errorMessage, seterrorMessage] = useState(null);

  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    seterrorMessage(null);

    try{
      const endpoint = `$(API_BASE_URL)/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);   

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      
      const data = await response.json();
      console.log(data);

    if (data.response === false) {
      seterrorMessage(data.Error || 'Failed to fetch movies. Please try again later.');
      setMovies([]);
      return;
    }

      setMovies(data.results || []);

    } catch (error) {
      console.error('Error fetching movies:', error);
      seterrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
      setIsLoading(true);
    }
  }

  useEffect(() => {
    fetchMovies();
    }, []);

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

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          <h2>All Movies</h2>
          
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ):(
            <ul>
              {movies.map((movie) => (
                <p key={movie.id} className="text-white">{movie.title}</p>
              ))}
            </ul>
          )}

        </section>
      </div>

    </main>
  )
}

export default App