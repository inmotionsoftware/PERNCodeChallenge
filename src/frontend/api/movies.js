import { request } from './base'

const calls = {}

const basepath = '/movies/'

calls.get = () => request(`${basepath}`)

calls.getMovie = (id) => request(`${basepath}${id}`)

calls.addMovie = (title, rating_classification, description, release_date) => 
  request(`${basepath}`, 'POST', {title, rating_classification, description, release_date})

calls.rateMovie = (id, rating) => request(`${basepath}${id}`, 'PUT', rating)

export default calls
