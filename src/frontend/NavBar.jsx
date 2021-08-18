import React from 'react'
import PropTypes from 'prop-types'
import NavItem from './NavItem'
import Search from './Search'

const NavBar = props => {
  const { page, logged_in, setPage, login, showMovie, showPerson, api, getPosts } = props

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <NavItem
              title='Movies'
              active={ page == 'Movies' }
              onClick={() => setPage('Movies')}
            />
            <NavItem
              title='People'
              active={ page == 'People' }
              onClick={() => setPage('People')}
            />
            <NavItem
              title='Posts'
              active={ page == 'Posts' }
              onClick={() => getPosts()}
            />
            <NavItem 
              title={ logged_in ? 'Logout' : 'Login' }
              active={ page == 'Login' }
              onClick={login}
            />
          </ul>
          <Search search={api.search} showMovie={showMovie} showPerson={showPerson} />
        </div>
      </nav>
    </header>  
  )
}

NavBar.propTypes = {
  page: PropTypes.string.isRequired,
  logged_in: PropTypes.bool,
  showMovie: PropTypes.func.isRequired,
  showPerson: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired
}

export default NavBar
