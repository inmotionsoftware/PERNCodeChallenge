import React, { Component } from 'react'
import PropTypes from 'prop-types'

const ClickList = props => {
  const { type, items, action } = props
  return (
    <div>
      <div className="label">{`${type}:`}</div>
      <div className="list-group">
        {items.map(item => {
          let id
          let name
          switch (type) {
            case 'Cast':
              id = item.person_id
              name = item.person
              break
            case 'Roles':
              id = item.movie_id
              name = item.title
              break
            default:
              break
          }
          return (
            <button
              type="button"
              key={`li-${type}-${id}`}
              className="list-group-item list-group-item-action list-group-item-secondary w-25"
              onClick={() => action(item)}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  )
}

ClickList.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  action: PropTypes.func.isRequired,
}

export default ClickList
