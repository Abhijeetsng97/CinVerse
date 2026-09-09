import React from 'react'

const MovieCard = ({ movie }) => {
  return (
    <li className="bg-gray-900 p-10 rounded-lg flex flex-col items-center text-center">
      <img
        src={movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : './no-poster.webp'}
        alt={movie.title}
        className="w-full h-auto rounded-md mb-3"
      />
      <h3 className="text-lg font-bold text-white mb-1">{movie.title}</h3>
      <p className="text-gray-400 text-sm line-clamp-3">{movie.overview}</p>
      <div className='flex items-center mt-2'>
        <img src='./star.svg' alt='Star' className='w-4 h-4 inline-block mr-1' />
      <p className="text-gray-400 inline-block">{movie.vote_average.toFixed(1)}</p>
      </div>
      
    </li>
  )
}

export default MovieCard

