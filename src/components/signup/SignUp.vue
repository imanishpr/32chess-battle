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
import SignUpWeb from '@/components/signup/SignUpWeb'
import SignUpMobile from '@/components/signup/SignUpMobile'
export default {
  name: 'SignUp',
  components: {
    'v-web': SignUpWeb,
    'v-mobile': SignUpMobile
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
