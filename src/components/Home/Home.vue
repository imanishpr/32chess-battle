<template>
  <v-mobile v-if="mobile()" />
  <v-web v-else />
</template>

<script>
import { isMobile } from '@/utils/helpers'
import HomeWeb from '@/components/Home/HomeWeb'
import HomeMob from '@/components/Home/HomeMobile'
export default {
  name: 'Home',
  components: {
    'v-web': HomeWeb,
    'v-mobile': HomeMob
  },
  methods: {
    mobile () {
      return isMobile()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
