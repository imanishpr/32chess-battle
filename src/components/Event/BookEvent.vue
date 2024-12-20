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
import BookEventWeb from '@/components/Event/BookEventWeb'
import BookEventMobile from '@/components/Event/BookEventMobile'
export default {
  name: 'BookEvent',
  components: {
    'v-web': BookEventWeb,
    'v-mobile': BookEventMobile
  },
  methods: {
    mobile () {
      return isMobile()
    }
  }
}
</script>
