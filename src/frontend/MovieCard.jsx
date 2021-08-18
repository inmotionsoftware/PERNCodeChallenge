import React from 'react'
import PropTypes from 'prop-types'

const Card = props => {
  const { movie, showMovie } = props
  const mr = movie.runtime
  const runtime = mr ? Object.keys(mr).reduce((p, c) => p.concat([mr[c], c]), []).join(' ') : ''
  const img = movie.thumbnail ? <img alt="movie thumbnail" src={`/assets/${movie.thumbnail}`} />
    : (
      <svg
        className="bd-placeholder-img card-img-top"
        width="100%"
        height="225"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
        role="img"
        aria-label="Placeholder: Thumbnail"
      >
        <title>{movie.title}</title>
        <rect width="100%" height="100%" fill="#55595c" />
        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
      </svg>
    )
  return (
    <div key={movie.movie_id} className="card m-3 p-3 shadow-sm" onClick={()=>showMovie(movie)}>
      {img}
      <div className="card-body">
        <h4>{movie.title}</h4>
        <p className="card-text">{movie.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">{runtime}</small>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    runtime: PropTypes.string,
    thumbnail: PropTypes.object
  }).isRequired,
  showMovie: PropTypes.func.isRequired
}

export default Card;
