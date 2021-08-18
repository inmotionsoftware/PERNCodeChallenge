
const request = async (path, method, body, h, errFn) => {
  try {
    const headers = new Headers(h)
    const options = { method: method || 'GET', body, headers }
    if (typeof options.body == 'object') {
      options.body = JSON.stringify(body)
      options.headers.set('Content-Type', 'application/json')
    }
    const res = await fetch(path, options)
    return await res.json()
  } catch (err) {
    // do nothing
    if (errFn) errFn(err)
  }
  return {}
}

const arrayRequest = async (...args) => {
  const res = await request(...args)
  return Object.keys(res).length == 0 ? [] : res
}

export { arrayRequest, request }
