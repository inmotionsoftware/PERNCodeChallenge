import React from 'react'
import PropTypes from 'prop-types'
import PersonCard from './PersonCard'

const People = props => {
  const { people, showPerson } = props

  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row">
          {people.map(person => (<PersonCard key={person.person_id} person={person} showPerson={showPerson} />))}
        </div>
      </div>
    </div>
  )
}

People.propTypes = {
  People: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    born: PropTypes.string.isRequired,
    died: PropTypes.string
  })),
  showPerson: PropTypes.func.isRequired
}

export default People
