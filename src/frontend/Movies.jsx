import React from 'react'
import PropTypes from 'prop-types'
import MovieCard from './MovieCard'

const Movies = props => {
  const { title, movies, showMovie } = props

  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <h2>{title}</h2>
        <div className="row">
          {movies.map(movie => (<MovieCard key={movie.movie_id} movie={movie} showMovie={showMovie} />))}
        </div>
      </div>
    </div>
  )
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string
  })),
  showMovie: PropTypes.func.isRequired
}

export default Movies
