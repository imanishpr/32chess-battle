<template>
  <div class="sign-up-container">
    <div id="signup-verify" v-if='bool == false && verifyBool == true'>

    </div>
    <div id="signup" v-if='bool == true && phone == false'>
        <div class="signup-heading">{{capitalizeFirstLetter('Create Account')}}</div>
        <input type="text" name="fullname" v-model="input.fullName" placeholder="Name" />
        <input type="text" name="username" v-model="input.username" placeholder="Email" />
        <input type="text" name="userphone" v-model="input.phone" placeholder="10 digit Mobile Number" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
<!--         <input type="password" name="password-confirm" v-model="input.passwordConfirm" placeholder="Confirm Password" /> -->
        <div class="forgot-pass">
          <div class="rem-m">
            <input type="checkbox" id="remember-me" name="remember-me" value="rem-me">
            <label for="remember-me"> Remember me</label>
          </div>
          <div class="forgot">
            <button @click="goToForgotPassword">Forgot Password?</button>
          </div>
        </div>
        <button class="sign-button" type="button" v-on:click="signingYouUpV2()">Sign Up</button>
        <div class="foot-text">Already have an account? <span type="button" v-on:click="goLoginScreen()">Log In</span></div>
    </div>
<!--     <div id="phone" v-if='bool == true && phone == true'>
        <h1>{{capitalizeFirstLetter('mmm')}}</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input v-if='otp == true' type="password" name="otp" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="getOtp()">{{otp == false ? 'Get OTP' : 'LogIn'}}</button>
    </div> -->
<!--     <div id="phone" v-if='bool == true && phone == false'>
      <div> OR </div>
      <button type="button" v-on:click="mobileLogin()">LogIn using mobile number and OTP</button>
    </div> -->
<!--     <div>{{verifyBool == false || (responseData !== undefined) ? (responseData !== undefined && responseData.data !== undefined ? 'lo' : '') : 'You have decided to be part of great sports community go ahead!'}}</div> -->
     <div>{{responseDataForVerification !== undefined && responseDataForVerification.data.code == 406 ? responseDataForVerification.data.response.errorMsg : ''}}</div>
     <div>{{internalError ? 'Something doesnt look right from our side please try again' : ''}}</div>
  </div>
</template>

<script>
import { signUp } from '@/utils/functions'
import { validateEmail, lettersAndSpaceCheck, trackEvent, signUpErrorResponseHandler } from '@/utils/helpers'
export default {
  name: 'SignUpWeb',
  computed: {
    bool: {
      get: function () {
        return this.responseData === undefined
      },
      set (value) {
        this.this.responseData = value
      }
    },
    verifyBool: {
      get: function () {
        return this.responseDataForVerification === undefined
      }
    }
  },
  updated () {
    if (this.bool === false) {
      document.getElementById('overlay').style.display = 'none'
      this.$emit('openOtpScreen', [true, this.input.phone, false])
    }
  },
  beforeMount () {
    // if (getCookie('loggedIn')) {
    //   this.$router.push({ name: 'Home' })
    // }
  },
  data () {
    return {
      phone: false,
      otp: false,
      input: {
        fullName: '',
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        phone: ''
      },
      responseData: undefined,
      responseDataForVerification: undefined,
      internalError: false
    }
  },
  methods: {
    getOtp () {
      this.otp = true
    },
    mobileLogin () {
      this.phone = true
    },
    goLoginScreen () {
      this.$emit('openOtpScreen', [false, this.input.phone, true])
    },
    signingYouUp () {
      if (this.input.username.trim() !== '' && this.password !== '' && this.password === this.passwordConfirm) {
        document.getElementById('overlay').style.display = 'block'
        let data = {
          'passWordVerify': this.input.password,
          'passWord': this.input.passwordConfirm
        }
        if (!isNaN(this.input.phone) && this.input.phone.length.trim() === 10) {
          data.phone = this.input.phone.trim()
          this.$store.commit('savePhone', this.input.phone.trim())
        } else {
          alert('Please Enter 10 digit valid mobile number')
          return
        }
        if (!isNaN(this.input.username)) {
          data.phone = this.input.username.trim()
        } else {
          data.email = this.input.username.trim()
        }
        signUp('post', data, '').then(response => (this.responseData = response)).catch(err => { signUpErrorResponseHandler(err.response) })
        if (this.responseData !== undefined && this.responseData.data !== undefined && this.responseData.data.code === 200) {
          this.bool = false
        }
        if (this.responseData !== undefined && this.responseData.response !== undefined && this.responseData.response.data.code === 406) {
          document.getElementById('overlay').style.display = 'none'

          this.bool = false
          this.verifyBool = true
        } else if (!this.bool && !this.verifyBool) {
          alert('This is unusual , please try again !!')
          this.internalError = true
          window.location.reload()
        }
      } else {
        alert('please fill all input fields correctly')
      }
    },
    signingYouUpV2 () {
      trackEvent('signup-button-web', 'sign-submit-web', 'signup', 1)
      if (this.input.username !== '' && this.input.password !== '' && this.input.fullName !== '' && this.input.phone !== '') {
        let data = {
          'passWordVerify': this.input.password,
          'passWord': this.input.password
        }
        if (lettersAndSpaceCheck(this.input.fullName.trim()) && this.input.fullName.length <= 25) {
          data.fullName = this.input.fullName.trim()
        } else {
          alert('Name length should be 25 or less')
          return
        }
        if (validateEmail(this.input.username.trim()) === true) {
          data.email = this.input.username.trim()
        } else {
          alert('Please enter valid and correct e-mail !!')
          return
        }
        if (!isNaN(this.input.phone) && this.input.phone.length === 10) {
          data.phone = this.input.phone.trim()
          this.$store.commit('savePhone', this.input.phone)
        } else {
          alert('Please Enter 10 digit valid mobile number')
          return
        }
        if (this.input.password.length > 15 || this.input.password.length < 6) {
          alert('Password length should be between 6 to 15')
          return
        }
        document.getElementById('overlay').style.display = 'block'
        signUp('post', data, '').then(response => (this.responseData = response)).catch(err => { signUpErrorResponseHandler(err.response) })
        if (this.responseData !== undefined && this.responseData.data !== undefined && this.responseData.data.code === 200) {
          this.bool = false
        }
        if (this.responseDataForVerification !== undefined && this.responseDataForVerification.response !== undefined && this.responseDataForVerification.response.data.code === 406) {
          this.bool = false
          this.verifyBool = true
        } else if (!this.bool && !this.verifyBool) {
          this.internalError = true
        }
      } else {
        alert('please fill all input fields correctly')
      }
    },
    getCookie () {
      return document.cookie
    },
    goToForgotPassword () {
      this.$router.push('/reset-passcode')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sign-up-container{

}
.signup-heading {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 44px;
  /* identical to box height, or 110% */
  letter-spacing: -0.64px;
  color: #FFFFFF;
  margin-bottom: 20px;
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
.sign-button {
  width: 58%;
  font-size: 20px;
  color: #262626;
  background: #ffffff;
  border-radius: 6px;
  height: 64px;
  border:none;
  font-weight: 600;
  cursor: pointer;
}
.forgot-pass {
  display: flex;
  margin-top: 25px;
  margin-bottom: 18px;
  color: #ffffff;
}
.rem-m {
  width: 40%;
  text-align: right;
}
.forgot {
  width: 57%;
  cursor: pointer;
}
.foot-text {
  font-size: 20px;
  color: #ffffff;
  font-weight: 400;
  margin-top: 20px;
  cursor: pointer;
}
.foot-text span{
  font-weight: 700;
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
