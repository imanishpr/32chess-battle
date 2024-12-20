<template>
    <div v-if="mobile()">
      <v-mobile></v-mobile>
    </div>
    <div v-else>
      <v-web></v-web>
    </div>
</template>

<script>
import { isMobile } from '@/utils/helpers'
import ThankyouWeb from '@/components/Thankyou/ThankyouWeb'
import ThankyouMobile from '@/components/Thankyou/ThankyouMobile'
export default {
  name: 'Thankyou',
  components: {
    'v-web': ThankyouWeb,
    'v-mobile': ThankyouMobile
  },
  methods: {
    mobile () {
      return isMobile()
    }
  }
}
</script>
