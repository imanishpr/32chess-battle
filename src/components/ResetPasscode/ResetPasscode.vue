<template>
    <v-web></v-web>
</template>

<script>
import { isMobile } from '@/utils/helpers'
import ResetPasscodeWeb from '@/components/ResetPasscode/ResetPasscodeWeb'
export default {
  name: 'Login',
  components: {
    'v-web': ResetPasscodeWeb
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
