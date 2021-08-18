import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ClickList from './ClickList'

const Person = props => {
  const { person, showMovie } = props
  const born = person.born && person.born.length ? new Date(person.born).toDateString() : null
  const died = person.died && person.died.length ? new Date(person.died).toDateString() : null

  return (
    <div className="row">
      <div className="col-sm-6 col-md-4">
        <img src="http://placehold.it/380x500" alt="" className="img-rounded img-responsive" />
      </div>
      <div className="col-sm-6 col-md-8">
        <h4>{person.name}</h4>
        <small>{person.description}</small>
        { born && <div>Born: {born}</div>}
        { died && <div>Died: {died}</div>}
        <div>{person.location}</div>
        {
          (person.roles && person.roles.length)
          && (
            <ClickList
              type="Roles"
              items={person.roles}
              action={showMovie}
            />
          )
        }
      </div>
    </div>
  )
}

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    location: PropTypes.string,
    born: PropTypes.number,
    died: PropTypes.number,
  }),
  showMovie: PropTypes.func.isRequired
}

export default Person
