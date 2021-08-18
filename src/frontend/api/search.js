import { request } from './base'

const calls = {}

const basepath = '/search/'

calls.find = (text) => request(`${basepath}?q=${text}`)

export default calls
