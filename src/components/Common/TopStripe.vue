<template>
  <div class="strip" v-if="isLogged()">
    <div class="user-info" @click="redirectToProfile">
      <i class="iconsax" icon-name="user-1"></i>
      <span>{{username}}</span>
    </div>
    <div class="logout" @click="logout">
      <i class="iconsax" icon-name="logout-1"></i>
      <div class="tooltip">Logout</div>
    </div>
  </div>
</template>
<script>
import { getCookie, deleteCookie } from '@/utils/functions'
export default {
  name: 'TopStripe',
  data () {
    return {
      username: null
    }
  },
  mounted () {
    this.username = getCookie('username')
  },
  methods: {
    redirectToProfile () {
      this.$router.push({ name: 'MyProfile' })
    },
    isLogged () {
      let username = getCookie('username')
      if (username == null || username === undefined || username === '') {
        return false
      }
      return true
    },
    logout () {
      deleteCookie('username')
      deleteCookie('auth')
      location.reload()
    }
  }
}
</script>
