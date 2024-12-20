<template>
  <transition v-if="flag">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div :class="{ 'modal-container-m': mobile(), 'modal-container': !mobile() }">
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" v-on:click="closePopUp()">
                <img class="cross-img" :src="cross">
              </button>
            </slot>
          </div>
          <div class="modal-header">
            <slot name="header">
            </slot>
            <slot v-if="login" name="header-1">
              <v-login @openOtpScreen="OtpScreenHandler($event)"></v-login>
            </slot>
            <slot v-if="signUp" name="header-2">
              <v-signup @openOtpScreen="OtpScreenHandler($event)" ></v-signup>
            </slot>
            <slot v-if="otpFlag" name="header-3">
              <v-otp v-bind="otpData" @openOtpScreen="closePopUp($event)"></v-otp>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import SignUp from '@/components/signup/SignUp'
import OtpScreen from '@/components/OtpScreen'
import Login from '@/components/login/Login'
import { isMobile } from '@/utils/helpers'
export default {
  name: 'PopUp',
  props: ['flag', 'login', 'otp', 'signUp'],
  components: {
    'v-login': Login,
    'v-signup': SignUp,
    'v-otp': OtpScreen
  },
  data () {
    return {
      otpData: {
        phone: ''
      },
      otpFlag: false,
      localFlag: this.flag,
      cross: 'https://res.cloudinary.com/parc-india/image/upload/v1644214173/Vector-2_obba7v.png'
    }
  },
  methods: {
    mobile () {
      return isMobile()
    },
    closePopUp () {
      this.$emit('shouldClosePopUp', false)
      this.otpFlag = false
    },
    OtpScreenHandler ($data) {
      console.log('openOtpScreen' + $data[0])
      if ($data[0] === true) {
        this.otpFlag = true
        this.signUp = false
        this.login = false
        this.otpData.phone = $data[1]
      }
      if ($data[2] === true) {
        this.otpFlag = false
        this.signUp = false
        this.login = true
      }
    }
  },
  mounted () {
  },
  updated () {
  }
}
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 45%;
  margin: 0px auto;
  padding: 15px 15px;
  background-color: #262626;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-container-m {
  margin: 0px auto;
  padding: 15px 15px;
  background-color: #262626;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
button {
background-color: -internal-light-dark(rgb(255, 255, 255), rgb(255, 255, 255));
}
.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  padding: 4px 5px 2px 5px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
}
.modal-default-button img {
  width: 11px;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
.modal-footer {
  text-align: right;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
