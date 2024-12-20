<template>
  <div>
    <div class="login-header">Welcome to <span class="com-name">32Chess-battle</span></div>
    <div class="continue">Login to continue</div>
    <div id="login" v-if='bool == true'>
        <input type="text" name="username" v-model="input.username" placeholder="Email Id" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button class="login-button" type="button" v-on:click="logingIn()">Login</button>
    </div>
    <div class="or">OR</div>
    <div class="form__group field">
      <div class="nine1">+91</div>
      <input type="input" name="phone" v-model="input.phone" class="form__field web-only" placeholder="Enter 10 digit mobile number" required />
    </div>
    <button class="login-button" type="button" v-on:click="logInWithOtp()">verify OTP & login</button>
  </div>
</template>

<script>
import { logIn, setCookie, getCookie, sendMotp } from '@/utils/functions'
import { isMobile, trackEvent, signUpErrorResponseHandler } from '@/utils/helpers'
export default {
  name: 'LoginWeb',
  computed: {
    bool: {
      get: function () {
        return this.responseData.data === undefined
      }
    },
    boolotp: {
      get: function () {
        return this.responseDataotp.data === undefined
      },
      set (value) {
        this.this.responseDataotp = value
      }
    }
  },
  updated () {
    console.log('updated out')
    if (!this.bool) {
      document.getElementById('overlay').style.display = 'none'
      console.log(this.responseData)
      setCookie('loggedIn', true)
      setCookie('auth', this.responseData.data.response, 100)
      this.subClaim = this.decodeJwt(this.responseData.data.response)
      console.log(this.subClaim.sub)
      setCookie('username', this.subClaim.sub, 100)
      const element = document.querySelector('.modal-default-button')
      element.click()
      window.location.reload()
    }
    if (this.boolotp === false) {
      console.log('updated')
      console.log('this.boolotp false')
      document.getElementById('overlay').style.display = 'none'
      this.$emit('openOtpScreen', [true, this.input.phone, false])
    }
  },
  beforeMount () {
    if (getCookie('loggedIn')) {
      // this.$router.push({ name: 'HelloWorld' })
    }
  },
  data () {
    return {
      subClaim: null,
      input: {
        username: '',
        password: ''
      },
      responseData: '',
      responseDataotp: ''
    }
  },
  mounted () {
    console.log('mounted')
    document.getElementById('overlay').style.display = 'none'
  },
  methods: {
    loginErrorResponseHandler (responseData) {
      console.log(responseData)
      document.getElementById('overlay').style.display = 'none'
      if (responseData.data.code !== 200 || responseData.data.result !== 'SUCCESS!!') {
        alert(responseData.data.response.errorMsg)
        this.otpScreen = false
      }
    },
    doSomethingElse (responseData) {
      console.log(responseData)
      console.log(responseData.data)
      console.log(responseData.data.code)
      document.getElementById('overlay').style.display = 'none'
      this.$emit('openOtpScreen', [true, this.input.phone, false])
    },
    mobile () {
      return isMobile()
    },
    decodeJwt (token) {
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
    },
    logingIn () {
      trackEvent('login-button', 'login', 'login-web', 1)
      if (this.input.username !== '' && this.password !== '') {
        document.getElementById('overlay').style.display = 'block'
        let data = {
          'email': this.input.username,
          'passWord': this.input.password
        }
        logIn('post', data, '').then(response => (this.responseData = response)).catch(err => { this.loginErrorResponseHandler(err.response) })
        if (this.responseData !== undefined && this.responseData.code === 200) {
          this.bool = false
        }
      }
    },
    logInWithOtp () {
      if (this.input.phone !== '') {
        let data = {
          'phone': this.input.phone
        }
        console.log(this.input.phone)
        if (!isNaN(this.input.phone) && this.input.phone.length === 10) {
          data.phone = this.input.phone
          this.$store.commit('savePhone', this.input.phone)
        } else {
          alert('Please Enter 10 digit valid mobile number')
          return
        }
        document.getElementById('overlay').style.display = 'block'
        sendMotp('post', data, '').then(response => (this.doSomethingElse(response))).catch(err => { signUpErrorResponseHandler(err.response) })
        if (this.responseDataotp !== undefined && this.responseDataotp.data !== undefined && this.responseDataotp.data.code === 200) {
          this.boolotp = false
          this.$emit('openOtpScreen', [true, this.input.phone, true])
        }
        if (this.responseDataForVerification !== undefined && this.responseDataForVerification.response !== undefined && this.responseDataForVerification.response.data.code === 406) {
          document.getElementById('overlay').style.display = 'none'
        } else if (!this.bool && !this.verifyBool) {
          alert('This is unusual , please try again !!')
          this.internalError = true
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-header {
  font-size: 30px;
  font-family: 'Poppins';
  color: #ffffff;
}
.login-header span{
  font-weight: 600;
}
.continue {
  font-size: 30px;
  margin: 28px 0;
  color: #ffffff;
  font-family: 'Poppins';
}
input[type="text" i] {
  width: 58%;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 6px;
  height: 54px;
  font-size: 18px;
  margin: 8px 0;
  font-family: 'Roboto';
  background: #262626;
  padding-left: 13px;
  color: #ffffff;
}
input[type="passWord" i] {
  width: 58%;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 6px;
  height: 54px;
  font-size: 18px;
  margin: 8px 0;
  font-family: 'Roboto';
  background: #262626;
  padding-left: 13px;
  color: #ffffff;
}
.login-button {
  width: 58%;
  font-size: 20px;
  color: #262626;
  background: #ffffff;
  border-radius: 6px;
  height: 49px;
  border:none;
  font-weight: 600;
  cursor: pointer;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 1px solid #FFFFFF;
  outline: 0;
  font-size: 1.3rem;
  color: #fff;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.form__group {
      margin-bottom: 4%;
}
.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: $gray;
}
.nine1{
  float: left;
  position: relative;
  left: 20%;
  font-size: 24px;
  font-family: 'Roboto';
  font-weight: 700;
  top: 4%;
  color: #fff;
  border-right: 2px solid #fff;
  bottom: -5px;
  padding-right: 4px;
}
.web-only {
  width: 51%;
  padding-left: 8%;
  padding-bottom: 10px;
  text-align: left;
  position: relative;
  left: -4%;
  font-size: 18px;
  font-family: 'Roboto';
}
.or {
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  padding: 7% 0;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
