import { request } from './base'

const calls = {}

const basepath = '/posts/'

calls.get = (from) => request(`${basepath}` + (from || ''))

calls.getByUser = (id, from) => request(`${basepath}user/${id}/` + (from || ''))

calls.getPost = (id) => request(`${basepath}${id}/`)

calls.add = (body) => request(`${basepath}`, 'POST', body)

calls.update = (id, body) => request(`${basepath}${id}/`, 'PUT', body)

export default calls
