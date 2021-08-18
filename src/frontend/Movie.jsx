import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClickList from './ClickList'

const Movie = props => {
  const { movie, showPerson } = props
  const releaseDate = new Date(movie.release_date).toDateString()
  return (
    <div className="container m-4 p-4 bg-white rounded shadow-lg">
      <div className="row">
        <div className="col-sm-6 col-md-4">
          <img src={"/assets/" + movie.thumbnail} alt="" className="img-rounded img-responsive" />
        </div>
        <div className="col-sm-6 col-md-8">
          <h4>{movie.title}</h4>
          <small>{movie.description}</small>
          <div>{movie.rating_classification}</div>
          <div>Released: {releaseDate}</div>
          <div>Avg. Rating: {movie.avg_rating}</div>
          {
            (movie.cast && movie.cast.length)
            && (
              <ClickList
                type="Cast"
                items={movie.cast}
                action={showPerson}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

Movie.propTypes = {
  movies: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    runtime: PropTypes.string,
    cast: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  showPerson: PropTypes.func.isRequired,
}

export default Movie
