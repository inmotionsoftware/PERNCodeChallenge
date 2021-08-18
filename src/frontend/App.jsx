import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import NavBar from './NavBar'
import Movies from './Movies'
import Movie from './Movie'
import People from './People'
import Person from './Person'
import Posts from './Posts'
import PostFull from './PostFull'
import Signin from './Signin'
import SignUp from './SignUp'
import { stateReducer, initialState } from './State'

const App = props => {
  const { api } = props
  const [state, dispatch] = useReducer(stateReducer, initialState)

  useEffect(() => {
    if (state.checkLogin) {
      api.user.check_login()
        .then(logged_in => dispatch({type: 'setLoggedin', payload: logged_in}))
    }
  }, [state.checkLogin])
  useEffect(() => {
    if (state.fetchMovies) {
      api.movies.get()
        .then(movies => {
          if (movies) {
            dispatch({ type: 'gotMovies', payload: movies })
          }
        })
    }
  }, [state.fetchMovies])
  useEffect(() => {
    if (state.fetchPeople) {
      api.people.get()
        .then(people => {
          if (people) {
            dispatch({ type: 'gotPeople', payload: people })
          }
        })
    }
  }, [state.fetchPeople])

  const setPage = payload => {
    dispatch({ type: 'setPage', payload })
  }

  const setState = payload => dispatch({ type: 'setState', payload})

  const makeCall = payload => {
    const call = api?.[payload.api]?.[payload.route]
    if (call == undefined) throw new Error('route not found for call', payload)
    let resolve
    call(...payload.args)
      .then(data => {
        dispatch({ type: 'callComplete', key: payload.key, payload: data })
        resolve(data)
      })
    return new Promise((res) => resolve = res)
  }

  const showMovie = movie => {
    dispatch({ type: 'selectMovie', payload: movie })
    api.movies.getMovie(movie.movie_id)
      .then(data => {
        dispatch({ type: 'gotMovie', payload: data })
      })
  }

  const showPerson = person => {
    dispatch({ type: 'selectPerson', payload: person })
    api.people.getPerson(person.person_id)
      .then(data => dispatch({ type: 'gotPerson', payload: data }))
  }

  const getPosts = page => {
    api.posts.get(page)
      .then(data => {
        dispatch({ type: 'gotPosts', payload: data, postsUser: null })
      })
  }

  const getUsersPosts = (user, page) => {
    api.posts.getByUser(user, page)
      .then(data => {
        dispatch({ type: 'gotPosts', payload: data, postsUser: user })
      })
  }

  const showPost = post => {
    api.posts.getPost(post)
      .then(data => {
        dispatch({ type: 'gotPost', payload: data })
      })
  }

  const logout = () => {
    api.user.logout()
      .then(() => { dispatch({type: 'Logout'}) })
      .catch(err => { console.log(`Logout failed.  Error: ${err}`) })
  }

  const login = creds => {
    api.user.login(creds.username, creds.password, creds.remember)
      .then((payload) => { dispatch({type: 'Login', payload}) })
      .catch(err => { console.log(`Login failed.  Error: ${err}`) })
  }

  let content
  switch (state.page) {
    case 'Login':
      content = <Signin login={login} setPage={setPage} />
      break
    case 'SignUp':
      content = <SignUp setPage={setPage} makeCall={makeCall} setState={setState} />
      break
    case 'Posts':
      content = <Posts posts={state.posts} showPost={showPost} getUsersPosts={getUsersPosts} />
      break
    case 'Post':
      content = <PostFull post={state.post} />
      break
    case 'People':
      content = <People people={state.people} showPerson={showPerson} />
      break
    case 'Person':
      content = <Person person={state.person} showMovie={showMovie} />
      break
    case 'Movie':
      content = <Movie movie={state.movie} showPerson={showPerson} />
      break
    case 'Movies':
    default:
      content = <Movies title="Movies" movies={state.movies} showMovie={showMovie} />
      break
  }
  return ([
    <NavBar
      key="navbar"
      api={api}
      page={state.page}
      logged_in={state.logged_in}
      login={() => (state.logged_in ? logout() : setPage('Login'))}
      showMovie={showMovie}
      showPerson={showPerson}
      getPosts={getPosts}
      setPage={setPage}/>,
    <main role="main" key="main">
      {content}
    </main>
  ])
}

App.defaultProps = {
  api: {
    movies: {},
    people: {},
    posts: {},
    user: {},
  }
}

App.propTypes = {
  api: PropTypes.shape({
    user: PropTypes.shape({
      login: PropTypes.func,
      check_login: PropTypes.func,
      logout: PropTypes.func
    }),
    people: PropTypes.shape({
      get: PropTypes.func
    }),
    movies: PropTypes.shape({
      get: PropTypes.func
    })
  })
}

export default App
