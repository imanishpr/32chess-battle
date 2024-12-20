import axios from 'axios'
import { getCookie } from '@/utils/functions'
const apiUrl = process.env.BASE_URL
export function getMyTeams (method, data, apiName) {
  let config = {
    method: 'get',
    url: apiUrl + '/team',
    headers: {
      'Authorization': 'Bearer ' + getCookie('auth')
    }
  }
  console.log(config)
  return axios(config)
}
export function createTeams (method, data, apiName) {
  let config = {
    method: 'post',
    url: apiUrl + '/team',
    data: data,
    headers: {
      'Authorization': 'Bearer ' + getCookie('auth')
    }
  }
  console.log(config)
  return axios(config)
}
export function searchUser (method, data, apiName) {
  let config = {
    method: 'get',
    url: apiUrl + '/user/search?username=' + data,
    headers: {
      'Authorization': 'Bearer ' + getCookie('auth')
    }
  }
  console.log(config)
  return axios(config)
}
export function invitePlayer (method, data, apiName) {
  let config = {
    method: 'post',
    url: apiUrl + '/team/invite',
    data: data,
    headers: {
      'Authorization': 'Bearer ' + getCookie('auth')
    }
  }
  console.log(config)
  return axios(config)
}
export function getMyInfo (method, data, apiName) {
  let config = {
    method: 'get',
    url: apiUrl + '/user/my-info',
    headers: {
      'Authorization': 'Bearer ' + getCookie('auth')
    }
  }
  console.log(config)
  return axios(config)
}
