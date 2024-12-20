const month = ['unknown', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export function getMonth (date) {
  if (date.substring(5, 6) === '0') {
    return month[date.substring(6, 7)]
  }
  return month[date.substring(5, 7)]
}
export const gameConfig = {
  1: 'Boys Single',
  2: 'Girls Single',
  3: 'Boys Doubles',
  4: 'Girls Doubles',
  5: 'Mixed Doubles',
  6: 'Team Sports/Games',
  7: 'Open'
}
export const games = {
  1: 'Boys Single',
  2: 'Girls Single',
  3: 'Boys Doubles',
  4: 'Girls Doubles',
  5: 'Mixed Doubles',
  6: 'Team Sports/Games',
  7: 'Open'
}
export function isMobile () {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}
export function validateEmail (mail) {
  // eslint-disable-next-line
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    console.log('yey')
    return true
  }
  console.log('ney')
  alert('You have entered an invalid email address!')
  return false
}
export function phonenumber (phone) {
  console.log(phone, 'df')
  // eslint-disable-next-line
  var phoneno = /^\d{10}$/;
  if (phone.value.match(phoneno)) {
    return true
  } else {
    alert('Please enter valid 10 digit mobile number')
    return false
  }
}
export function lettersAndSpaceCheck (name) {
  return true
}

export function trackEvent (eventCategory, eventAction, eventLabel, eventValue) {
  if (window.gtag) {
    console.log('pushed')
    window.gtag('event', eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: eventValue
    })
  }
}
export function signUpErrorResponseHandler (responseData) {
  trackEvent('signup-error--event', 'error', 'error-sign', 1)
  document.getElementById('overlay').style.display = 'none'
  if (responseData.data.code !== 200 || responseData.data.result !== 'SUCCESS!!') {
    alert(responseData.data.response.errorMsg)
    this.otpScreen = false
  }
}
