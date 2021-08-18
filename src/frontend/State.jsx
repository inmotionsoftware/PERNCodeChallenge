const initialState = {
  page: 'Movies',
  logged_in: false,
  movies: [],
  people: [],
  movie: {},
  person: {},
  posts: [],
  post: {},
  selectedMovie: null,
  selectedPerson: null,
  checkLogin: true,
  fetchMovies: true,
  fetchMovie: null,
  fetchPeople: true,
  fetchPerson: null
}

const slice = (obj,...prop) => prop.length > 1 && obj.hasOwnProperty(prop[0]) ? slice(obj[prop[0]],...(prop.slice(1))) : obj[prop[0]]

const split = (string) => String(string).split(/[,\.\/\|]/)
const props = (p) => split(p).slice(0,-1)
const splitSlicer = (prop) => slicer(...split(prop))
const slicer = (...props) => (obj) => slice(obj,...props)
const deepSet = (prop) => (obj) => (value) => { (split(prop).length == 1 ? obj : slicer(...props(prop))(obj))[split(prop).slice(-1)] = value }

const removeProp = (obj, key) => {
  const tempObj = Object.assign({}, obj)
  if (tempObj.hasOwnProperty(key)) {
    delete tempObj[key]
  }
  return tempObj
}

function stateReducer(state, action) {
  switch (action.type) {
    case 'callComplete':
      if (action.key !== null) {
        const ns = Object.assign({}, state)
        deepSet(action.key)(ns)(action.payload)
        return ns
      } else {
        return {...state, ...action.payload}
      }
    case 'setState':
      return {...state, ...action.payload}
    case 'setPage':
      return {...state, page: action.payload}
    case 'setLoggedin':
      const l = action.payload.logged_in
      return {...state, checkLogin: false, page: !!l ? 'Movies' : 'Login', logged_in: !!l, token: action.payload.token, ...l}
    case 'Login':
      return {...state, logged_in: true, page: 'Movies', ...action.payload}
      //return {...state, logged_in: true, page: 'Movies'}
    case 'Logout':
      return {...state, logged_in: false, page: 'Movies'}
    case 'getMovies':
      return {...state, fetchMovies: true}
    case 'gotMovies':
      return {...state, fetchMovies: false, movies: action.payload}
    case 'gotMovie':
      return {...state, movie: action.payload}
    case 'getPeople':
      return {...state, fetchPeople: true}
    case 'gotPeople':
      return {...state, fetchPeople: false, people: action.payload}
    case 'gotPerson':
      return {...state, person: action.payload}
    case 'gotPost':
      return {...state, page: 'Post', post: action.payload}
    case 'gotPosts':
      return {...state, page: 'Posts', posts: action.payload, postsUser: action.postsUser}
    case 'selectMovie':
      return {...state, page: 'Movie', movie: action.payload}
    case 'selectPerson':
      return {...state, page: 'Person', person: action.payload}
    default:
      throw new Error()
  }
}

export { deepSet, initialState, stateReducer, slice, slicer, splitSlicer }
