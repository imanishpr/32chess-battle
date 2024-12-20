<template>
  <div>
    <div class="login-header">Welcome back to <span class="com-name">32Chess-battle</span></div>
    <div class="continue">Login to continue</div>
    <div id="login" v-if='bool == true'>
        <input class="l-m" type="text" name="username" v-model="input.username" placeholder="Email Id" />
        <input class="l-m" type="password" name="password" v-model="input.password" placeholder="Password" />
        <button class="login-button" type="button" v-on:click="logingIn()">Login</button>
    </div>
    <div class="or">OR</div>
    <div class="form__group field" v-if='bool == true'>
      <div class="nine1-m">+91</div>
      <input type="input" name="phone" v-model="input.phone" class="form__field mob-only" placeholder="Enter 10 digit mobile number" required />
    </div>
    <button class="login-button" type="button" v-on:click="logInWithOtp()">verify OTP & Log In</button>
  </div>
</template>

<script>
import { logIn, setCookie, getCookie, decodeJwt, sendMotp } from '@/utils/functions'
import { isMobile, trackEvent, signUpErrorResponseHandler } from '@/utils/helpers'
export default {
  name: 'LoginMobile',
  computed: {
    bool: {
      get: function () {
        return this.responseData.data === undefined
      }
    }
  },
  updated () {
    if (!this.bool) {
      document.getElementById('overlay').style.display = 'none'
      setCookie('loggedIn', true)
      setCookie('auth', this.responseData.data.response, 100)
      this.subClaim = decodeJwt(this.responseData.data.response)
      setCookie('username', this.subClaim.sub, 100)
      const element = document.querySelector('.modal-default-button')
      element.click()
      window.location.reload()
    }
  },
  beforeMount () {
    if (getCookie('loggedIn')) {
      // this.$router.push({ name: 'HelloWorld' })
    }
  },
  mounted () {
    document.getElementById('overlay').style.display = 'none'
  },
  data () {
    return {
      subClaim: null,
      input: {
        username: '',
        password: ''
      },
      responseData: ''
    }
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
    doSomethingElse (responseData1) {
      if (responseData1 !== undefined) {
        if (responseData1.data !== undefined) {
          if (responseData1.data.code !== undefined) {
            document.getElementById('overlay').style.display = 'none'
            this.$emit('openOtpScreen', [true, this.input.phone, false])
          }
        }
      }
    },
    mobile () {
      return isMobile()
    },
    logingIn () {
      trackEvent('login-button-mobile', 'login-mobile', 'login-mobile', 1)
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
      } else {
        alert('please provide correct information !!')
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
          console.log('commit 144 line')
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
  font-weight: 700;
  margin-left: 21%;
  margin-bottom: 3%;
  margin-top: 6%;
  text-align: left;
  color: #ffffff;
  font-family: 'Roboto';
}

.continue-m input.in-mobile {
  width: 100%;
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

input[type="text" i].l-m {
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
  width: 100%;
}
input[type="passWord" i].l-m {
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
  width: 100%;
}
.login-button {
  width: 100%;
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
.nine1-m{
  float: left;
  position: relative;
  font-size: 24px;
  font-family: 'Roboto';
  font-weight: 700;
  top: 4%;
  color: #fff;
  border-right: 2px solid #fff;
  bottom: -5px;
  padding-right: 4px;
}
.mob-only {
  width: 70%;
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
