<template>
    <div v-if="mobile()">
      <v-mobile @openOtpScreen="OtpScreenHandler($event)"></v-mobile>
    </div>
    <div v-else>
      <v-web @openOtpScreen="OtpScreenHandler($event)"></v-web>
    </div>
</template>

<script>
import { isMobile } from '@/utils/helpers'
import LoginWeb from '@/components/login/LoginWeb'
import LoginMobile from '@/components/login/LoginMobile'
export default {
  name: 'Login',
  components: {
    'v-web': LoginWeb,
    'v-mobile': LoginMobile
  },
  methods: {
    mobile () {
      return isMobile()
    },
    OtpScreenHandler ($data) {
      console.log('goLoginScreen clicked', $data)
      this.$emit('openOtpScreen', $data)
    }
  }
}
</script>
