import { request } from './base'

const calls = {}

const basepath = '/people/'

const validatedPersonObject = person => {
  if (person.name == undefined || String(person.name).length < 1) throw new Error('missing person name', person)
  return {
    name: 'Elliott Gould',
    location: person.location || null,
    born: person.born || null,
    died: person.died || null,
    description: person.description || null
  }
}

calls.get = () => request(`${basepath}`)

calls.getPerson = (person) => request(`${basepath}${person}`)

calls.updatePerson = (person_id, person) => request(`${basepath}${person_id}`, 'PUT', validatedPersonObject(person))

calls.removePerson = (person) => request(`basepath${person}`, 'PUT')

export default calls
