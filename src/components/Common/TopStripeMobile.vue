<template>
  <div class="strip">
    <div class="m-bar-logo-cont">
      <button class="open-btn" v-on:click="toggleSideBar()">{{popUpSign}}</button>
    </div>
    <div class="user-info" v-if="isLogged()" @click="redirectToProfile">
      <i class="iconsax" icon-name="user-1"></i>
      <span>{{username}}</span>
    </div>
    <div class="logout" @click="logout" v-if="isLogged()">
      <i class="iconsax" icon-name="logout-1"></i>
      <div class="tooltip">Logout</div>
    </div>
  </div>
</template>
<script>
import { getCookie, deleteCookie } from '@/utils/functions'
export default {
  name: 'TopStripeMobile',
  data () {
    return {
      username: ':)',
      popUpSign: '☰',
      sidebarPop: false
    }
  },
  methods: {
    redirectToProfile () {
      this.$router.push({ name: 'MyProfile' })
    },
    logout () {
      deleteCookie('username')
      deleteCookie('auth')
      location.reload()
    },
    isLogged () {
      let username = getCookie('username')
      if (username == null || username === undefined || username === '') {
        return false
      }
      return true
    },
    toggleSideBar () {
      if (this.sidebarPop === false) {
        this.popUpSign = 'X'
        this.sidebarPop = true
        document.getElementById('m-left-panel').style.width = '110px'
      } else {
        this.popUpSign = '☰'
        this.sidebarPop = false
        document.getElementById('m-left-panel').style.width = '0'
      }
    }
  },
  mounted () {
    this.username = getCookie('username')
  }
}
</script>
<style type="text/css" scoped>
.m-bar-logo-cont {
  position: absolute;
  width: 91%;
}
</style>
