import { request } from './base'

const calls = {}

const basepath = '/assets/'

// this should generally not be used, most assets are not text/json data
calls.get = (id) => request(`${basepath}${id}`)

// provide a name as a string plus file as document.getElementById('my-input').files[0]
calls.save = async (name, file) => {
  const data = new FormData()
  data.append('file', file)

  fetch(`/${basepath}/${name}`, {
    method: 'POST',
    body: data
  })
}

export default calls
