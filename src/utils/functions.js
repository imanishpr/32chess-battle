import axios from 'axios'
const apiUrl = process.env.BASE_URL
export function signUp (method, data, apiName) {
  let config = {
    method: 'post',
    url: apiUrl + '/user/signup',
    data: data,
    headers: {
      'Authorization': '32chess-release-plan-2024'
    }
  }
  return axios(config)
}
export function logIn (method, data, apiName) {
  let config = {
    method: 'post',
    url: apiUrl + '/user/login',
    data: data,
    headers: {
      'Authorization': '32chess-release-plan-2024'
    }
  }
  return axios(config)
}
export function getEvents (method, data, apiName) {
  let config = {
    method: 'get',
    url: apiUrl + '/api/event?city_id=-1&game_id=-1'
  }
  return axios(config)
}

export function getEventPrices (method, data, apiName) {
  let config = {
    method: 'get',
    url: apiUrl + '/api/event_prices?event_id=' + data,
    headers: {
      'Authorization': 'Bearer ' + getCookie('auth')
    }
  }
  return axios(config)
}

export function getEventById (method, id) {
  let config = {
    method: 'get',
    url: apiUrl + '/api/event_by_id?event_id=' + id
  }
  return axios(config)
}
export function bookEvent (method, data, apiName) {
  let config = {
    method: 'post',
    url: apiUrl + '/api/book_event',
    data: data,
    headers: {
      'Authorization': 'Bearer ' + getCookie('auth')
    }
  }
  return axios(config)
}
export function getPaymentStatusById (method, id) {
  let config = {
    method: 'get',
    url: apiUrl + '/api/payment_status?paymentId=' + id,
    headers: {
      'Authorization': 'Bearer ' + getCookie('auth')
    }
  }
  return axios(config)
}
export function getFixtureByEventId (method, id) {
  let config = {
    method: 'get',
    url: apiUrl + '/make-fixture?event_id=' + id,
    headers: {
      'Authorization': 'Bearer ' + getCookie('auth')
    }
  }
  return axios(config)
}
export function updateWinnerMethod (method, data, apiName) {
  let config = {
    method: 'post',
    url: apiUrl + '/update-winner',
    data: data,
    headers: {
      'Authorization': 'Bearer ' + getCookie('auth')
    }
  }
  return axios(config)
}
export function getMyUpcomingMatches () {
  let config = {
    method: 'get',
    url: apiUrl + '/user/my-up-matches',
    headers: {
      'Authorization': 'Bearer ' + getCookie('auth')
    }
  }
  return axios(config)
}
export function sendMotp (method, data, apiName) {
  let config = {
    method: 'post',
    url: apiUrl + '/user/send-m-otp',
    data: data,
    headers: {
      'Authorization': '32chess-release-plan-2024'
    }
  }
  return axios(config)
}
export function resetPass (method, data, apiName) {
  let config = {
    method: 'post',
    url: apiUrl + '/user/reset-password',
    data: data,
    headers: {
      'Authorization': '32chess-release-plan-2024'
    }
  }
  return axios(config)
}
export function setCookie (name, value, days) {
  console.log('setCookie')
  document.cookie = `${name}=${value};max-age=${60 * 60 * 24 * days}; domain=staging.dv70k5jc8m06p.amplifyapp.com/; path=/; SameSite=None;`
}
export function getCookie (name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}
export function deleteCookie (name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=staging.dv70k5jc8m06p.amplifyapp.com/; path=/; SameSite=None;`
}
export function decodeJwt (token) {
  var base64Payload = token.split('.')[1]
  var payload = decodeURIComponent(
    atob(base64Payload)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
  return JSON.parse(payload)
}
export function isLogged () {
  let username = getCookie('auth')
  if (username == null || username === undefined || username === '') {
    return false
  }
  return true
}
