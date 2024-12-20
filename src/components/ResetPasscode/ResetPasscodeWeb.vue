<template>
  <div>
    <div class="login-header">Welcome to <span class="com-name">32Chess-battle</span></div>
    <div class="continue">Let's reset your passcode</div>
    <div v-if='otpScreen == false' class="form__group field">
      <div class="prequals">+91</div>
      <input type="input" name="phone" v-model="input.phone" class="form__field web-only" placeholder="Enter 10 digit mobile number" required />
      <br>
      <br>
      <button class="login-button" type="button" v-on:click="logInWithOtp()">Get otp and set passcode</button>
    </div>
    <div v-if='otpScreen == true'>
      <div class="otp-heading">  Enter 6 digit code sent to you mobile number </div>
          <input type="password" name="passcode" v-model="input.password" class="form__field web-only" placeholder="Enter password" required />
          <input type="password" name="verifyPasscode" v-model="input.verifyPasscode" class="form__field web-only" placeholder="Enter password again" required />
          <input type="text" name="otp" v-model="input.otp" class="form__field web-only" placeholder="Enter 6 digit OTP" required />
          <br>
          <button class="otp-button" type="button" v-on:click="validateOtpAndResetPass()">Validate OTP and reset passcode</button>\
      </div>
    </div>
</template>

<script>
import { sendMotp, resetPass } from '@/utils/functions'
import { trackEvent } from '@/utils/helpers'
export default {
  name: 'ResetPasscodeWeb',
  computed: {
    bool: {
      get: function () {
        return this.otpScreen
      }
    }
  },
  data () {
    return {
      subClaim: null,
      input: {
        password: '',
        verifyPasscode: '',
        otp: ''
      },
      responseData: '',
      responseDataotp: '',
      otpScreen: false,
      phone: '',
      sessionDetail: '',
      otp: ''
    }
  },
  mounted () {
    document.getElementById('overlay').style.display = 'none'
  },
  methods: {
    sendOtpResponseHandler (responseData) {
      trackEvent('resetpass--button', 'reset', 'reset-both', 1)
      document.getElementById('overlay').style.display = 'none'
      if (responseData.data.code !== 200 || responseData.data.result !== 'SUCCESS!!') {
        alert(responseData.data.response.errorMsg)
        this.otpScreen = false
      } else {
        this.phone = responseData.data.response.phone
        this.sessionDetail = responseData.data.response.sessionDetail
        this.otpScreen = true
      }
    },
    passResetHandler (responseData) {
      document.getElementById('overlay').style.display = 'none'
      if (responseData.data.code !== 200 || responseData.data.result !== 'SUCCESS!!') {
        alert(responseData.data.response.errorMsg)
        this.otpScreen = false
      } else {
        alert('Pass reset successfully please login now !!')
        this.$router.push('/')
      }
    },
    validateOtpAndResetPass (value) {
      document.getElementById('overlay').style.display = 'block'
      const { password, verifyPasscode, otp } = this.input
      if (password !== verifyPasscode) {
        alert('Passwords do not match. Please try again.')
        return
      }
      if (password.length > 15 || password.length < 6) {
        alert('Password length should be between 6 to 15')
        return
      }
      let data = {
        'phone': this.phone,
        'otp': otp,
        'sessionDetail': this.sessionDetail,
        'passWord': password,
        'passWordVerify': verifyPasscode
      }
      resetPass('post', data, '').then(response => (this.passResetHandler(response))).catch(err => (this.passResetHandler(err.response)))
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
        sendMotp('post', data, '').then(response => (this.sendOtpResponseHandler(response))).catch(err => (this.sendOtpResponseHandler(err.response)))
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
.prequals{
  float: left;
  position: relative;
  left: 18%;
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
.otp-button {
  padding: 2% 12%;
  background: #ffffff;
  border-radius: 6px;
  border: none;
  margin-top: 5%;
  font-weight: 600;
  font-size: 19px;
  font-family: 'Roboto';
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
