import axios from 'axios'
// const apiUrl = process.env.BASE_URL
const chessMoverUrl = 'http://ec2-13-232-115-23.ap-south-1.compute.amazonaws.com:3000'

export function getCurrentMatch (method, data, apiName) {
  console.log(chessMoverUrl)
  let config = {
    method: 'get',
    url: chessMoverUrl + '/match/' + data,
    headers: {
      'Authorization': 'Bearer ' + getCookie('auth')
    }
  }
  // console.log(config)
  return axios(config)
}

export function setCookie (name, value, days) {
  console.log('setCookie')
  document.cookie = `${name}=${value};max-age=${60 * 60 * 24 * days};path=/`
}
export function getCookie (name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}
