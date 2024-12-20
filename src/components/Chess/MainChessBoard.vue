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
import MainChessBoardWeb from '@/components/Chess/MainChessBoardWeb'
import MainChessBoardMobile from '@/components/Chess/MainChessBoardMobile'
export default {
  name: 'BookEvent',
  components: {
    'v-web': MainChessBoardWeb,
    'v-mobile': MainChessBoardMobile
  },
  methods: {
    mobile () {
      return isMobile()
    }
  }
}
</script>
