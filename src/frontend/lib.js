const parseToken = (token) => String(token).split(' ')[1].split('.').slice(0,2).map(s=>JSON.parse(String(atob(s))))

export const getCookies = () =>
  Object.fromEntries(document.cookie
    .split(';')
    .map(c=>c.trim())
    .filter(c=>c.length>2)
    .map(c=>c.split('=', 2).map(s=>decodeURIComponent(s))))

export const getToken = () => {
  const cookies = getCookies()
  if (cookies.access_token)
    return Object.assign({}, ...parseToken(cookies.access_token))
  else
    return {}
}

export const dateFmt = (dt) => {
  const d = new Date(dt)
  const delta = Math.round(((new Date()) - d) / 1000)
  if (delta < 60) return `${delta} seconds ago`
  if (delta < 60 * 60) return `${Math.floor(delta/60)} minutes ago`
  if (delta < 60 * 60 * 24) return `${Math.floor(delta/(60*60))} hours ago`
  if (delta < 60 * 60 * 24 * 30) return `${Math.floor(delta/(60*60*24))} days ago`
  if (delta < 60 * 60 * 24 * 365) return `${Math.floor(delta/(60*60*24*30))} months ago`
  return `${Math.floor(delta/(60*60*24*365))} years ago`
}
