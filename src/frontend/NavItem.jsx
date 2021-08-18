import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const NavItem = props => {
  const { title, active, onClick } = props

  return (
    <li className="nav-item active">
      <a
        role="link"
        className={classnames("nav-link", { active })}
        onClick={onClick}
      >
          {title}
      </a>
    </li>
  )
}

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default NavItem
