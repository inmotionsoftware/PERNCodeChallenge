import React from 'react'
import PropTypes from 'prop-types'

const Card = props => {
  const { person, showPerson } = props
  const runtime = person.runtime || '0'
  const img = person.thumbnail_asset ? <img src={'/assets/' + person.thumbnail_asset} />
    : <svg
        className="bd-placeholder-img card-img-top"
        width="100%"
        height="225"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
        role="img"
        aria-label="Placeholder: Thumbnail"
      >
        <title>{person.name}</title>
        <rect width="100%" height="100%" fill="#55595c" />
        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
          </svg>
    let age
  if (person.born) {
    const born = new Date(person.born)
    const died = person.died ? new Date(person.died) : new Date()
    age = (new Date(died - born)).getFullYear() - 1970
  } else {
    age = 'unknown'
  }
  return (
    <div key={person.person_id} className="card m-3 p-2 shadow-sm">
      {img}
      <div className="card-body">
        <h4>{person.name}</h4>
        <p className="card-text">{person.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={()=>showPerson(person)}>View</button>
          </div>
          <small className="text-muted">age {`${age}`}</small>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    born: PropTypes.date
  }).isRequired,
  showPerson: PropTypes.func.isRequired
}

export default Card;
