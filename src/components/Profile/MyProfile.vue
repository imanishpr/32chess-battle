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
import MyProfileWeb from '@/components/Profile/MyProfileWeb'
import MyProfileMobile from '@/components/Profile/MyProfileMobile'
export default {
  name: 'BookEvent',
  components: {
    'v-web': MyProfileWeb,
    'v-mobile': MyProfileMobile
  },
  methods: {
    mobile () {
      return isMobile()
    }
  }
}
</script>
