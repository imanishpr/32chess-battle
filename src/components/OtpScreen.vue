<template>
  <div>
    <div class="otp-heading">  Enter 6 digit code sent to you mobile number </div>
    <div class="edit-phone"> +91-{{phone}} </div>
    <div class="otp-cont">
      <v-otp-input
        ref="otpInput"
        input-classes="otp-input"
        separator=""
        :num-inputs="6"
        :should-auto-focus="true"
        :is-input-num="true"
        @on-change="handleOnChange"
        @on-complete="handleOnComplete"
      />
      <!-- <button @click="handleClearInput()">Clear Input</button> -->
    </div>
    <button class="otp-button" type="button" v-on:click="validateOtpAndLogin()">{{otpButtonText}}</button>
  </div>
</template>
<script>
import {setCookie, signUp, decodeJwt} from '@/utils/functions'
import OtpInput from '@bachdgvn/vue-otp-input'
import { trackEvent, signUpErrorResponseHandler } from '@/utils/helpers'
export default {
  name: 'OtpScreen',
  computed: {
    bool: {
      get: function () {
        return this.responseData.data === undefined
      }
    }
  },
  props: ['phone'],
  components: {
    'v-otp-input': OtpInput
  },
  data () {
    return {
      otpButtonText: 'Sign In',
      responseData: '',
      responseDataForVerification: '',
      subClaim: null
    }
  },
  mounted () {
    document.getElementById('overlay').style.display = 'none'
  },
  updated () {
    console.log(this.bool)
    if (!this.bool || this.responseData.data !== undefined) {
      console.log(this.responseData)
      setCookie('loggedIn', true)
      setCookie('auth', this.responseData.data.response, 10)
      this.subClaim = decodeJwt(this.responseData.data.response)
      console.log(this.subClaim.sub)
      setCookie('username', this.subClaim.sub, 100)
      this.$emit('openOtpScreen', false)
      window.location.reload()
    }
  },
  watch: {
    'responseData': function (newVal, oldVal) {
      if (newVal.data.code === 200) {
        console.log(this.responseData)
        setCookie('loggedIn', true)
        setCookie('auth', this.responseData.data.response, 10)
        this.$emit('openOtpScreen', false)
        this.subClaim = decodeJwt(this.responseData.data.response)
        console.log('d2' + this.subClaim.sub)
        setCookie('username', this.subClaim.sub, 100)
        window.location.reload()
      }
      console.log(newVal, oldVal)
    }
  },
  methods: {
    handleOnComplete (value) {
      trackEvent('otp-button', 'otp-submit', 'otp', 1)
      this.otpButtonText = 'Please wait, verifying..'
      document.getElementById('overlay').style.display = 'block'
      this.validateOtpAndLogin(value)
    },
    handleOnChange (value) {
      console.log('OTP changed: ', value)
    },
    handleClearInput () {
      this.$refs.otpInput.clearInput()
    },
    validateOtpAndLogin (value) {
      let data = {
        'phone': this.$store.state.phone,
        'otp': value
      }
      signUp('post', data, '').then(response => (this.responseData = response)).catch(err => { signUpErrorResponseHandler(err.response) })
      if (this.responseData !== undefined && this.responseData.data !== undefined && this.responseData.data.code === 200) {
        this.bool = false
      }
      if (this.responseDataForVerification !== undefined && this.responseDataForVerification.response !== undefined && this.responseDataForVerification.response.data.code === 406) {
        document.getElementById('overlay').style.display = 'none'
        this.bool = false
        this.verifyBool = true
      } else if (!this.bool && !this.verifyBool) {
        alert('This is unusual , please try again !!')
        this.internalError = true
        window.location.reload()
      }
    }
  }
}
</script>
<style>
.otp-heading {
  font-size: 24px;
  color: #ffffff;
}
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 4px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.otp-cont {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.otp-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
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
.edit-phone {
  margin: 15px 0px;
  color: #ffffff;
}
</style>
