<template>
  <v-mobile v-if="mobile()" />
  <v-web v-else />
</template>

<script>
import { isMobile } from '@/utils/helpers'
import MyMatchWeb from '@/components/MyMatch/MyMatchWeb'
import MyMatchMob from '@/components/MyMatch/MyMatchMobile'
export default {
  name: 'MyMatch',
  components: {
    'v-web': MyMatchWeb,
    'v-mobile': MyMatchMob
  },
  methods: {
    mobile () {
      return isMobile()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
