import { request } from './base'

const user = {}

const basepath = '/user/'

user.login = async (username, password, remember) => {
  try {
    const res = await fetch(`${basepath}login`,
      {
        method: 'POST',
        body: JSON.stringify({ username, password, remember }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
        redirect: 'manual'
      })
    if (res.status == 200) {
      return Promise.resolve(await res.json())
    }
  } catch (err) {
    // do nothing
  }
  return Promise.reject(new Error('login failed'))
}

user.check_login = async () => {
  try {
    const res = await fetch(`${basepath}home`)
    if (res.status == 401) {
      return false
    }
    return await res.json()
  } catch (err) {
    return false
  }
}

user.add = account => request(`${basepath}signup`, 'POST', account)

user.logout = async () => {
  try {
    const res = await fetch('/user/logout')
    if (res.redirect || res.status == 200 || res.status == 201) {
      return Promise.resolve(true)
    }
  } catch (err) {
    if (err.redirect) {
      return Promise.resolve(true)
    }
  }
  return Promise.reject(new Error('logout failed'))
}

export default user
