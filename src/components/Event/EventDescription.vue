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
import EventDescriptionWeb from '@/components/Event/EventDescriptionWeb'
import EventDescriptionMobile from '@/components/Event/EventDescriptionMobile'
export default {
  name: 'EventDescription',
  components: {
    'v-web': EventDescriptionWeb,
    'v-mobile': EventDescriptionMobile
  },
  methods: {
    mobile () {
      return isMobile()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
