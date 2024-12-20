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
import PageNotFoundWeb from '@/components/notFound/PageNotFoundWeb'
import PageNotFoundMobile from '@/components/notFound/PageNotFoundMobile'
export default {
  name: 'BookEvent',
  components: {
    'v-web': PageNotFoundWeb,
    'v-mobile': PageNotFoundMobile
  },
  methods: {
    mobile () {
      return isMobile()
    }
  }
}
</script>
