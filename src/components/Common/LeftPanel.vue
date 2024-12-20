<template>
  <div>
    <div  class="main-logo" @click="redirectToHome">
        <img class="logo-img" src="../../assets/logo.png" width="70">
    </div>
    <div class="my-name">
      32Chess-battle
    </div>
    <div class="logo"  @click="redirectToHome" @mouseover="ishomeHovering = true"
      @mouseout="ishomeHovering = false"
      :class="{current: ishomeHovering}">
      <i class="iconsax" icon-name="home-2"></i>
      <div>Home</div>
    </div>
<!--     <div class="logo" @mouseover="isFixtureHovering = true"
      @mouseout="isFixtureHovering = false"
      :class="{current: isFixtureHovering}">
      <i class="iconsax" icon-name="trophy"></i>
      <div>Tournament Standings</div>
    </div> -->
    <div class="logo" @click="redirectToMyMatch" @mouseover="isPlayHovering = true"
      @mouseout="isPlayHovering = false"
      :class="{current: isPlayHovering}">
      <i class="iconsax" icon-name="ranking"></i>
      <div>My Matches</div>
    </div>
    <div class="logo" v-if="!isLogged()">
      <div class="sign-up" v-on:click="OpenPopUp(2)">Sign Up</div>
    </div>
    <div class="logo" v-if="!isLogged()">
      <div class="login" v-on:click="OpenPopUp(1)">Log In</div>
    </div>
    <div class="logo" v-if="isLogged()"  @click="redirectToProfile" @mouseover="isAboutHovering = true"
      @mouseout="isAboutHovering = false"
      :class="{current: isAboutHovering}">
      <i class="iconsax" icon-name="user-1-square"></i>
      <div>My Profile</div>
    </div>
    <div class="logo" @click="helpAndContactInstaPage" @mouseover="isHelpHovering = true"
      @mouseout="isHelpHovering = false"
      :class="{current: isHelpHovering}">
      <i class="iconsax" icon-name="instagram"></i>
      <div>Help</div>
    </div>
    <div class="logo" @click="redirectToContactUs" @mouseover="isContactHovering = true"
      @mouseout="isContactHovering = false"
      :class="{current: isContactHovering}">
      <i class="iconsax" icon-name="24hr-service"></i>
      <div>Contact Us</div>
    </div>
    <div class="logo" @click="redirectToTnc" @mouseover="isTnCHovering = true"
      @mouseout="isTnCHovering = false"
      :class="{current: isTnCHovering}">
      <i class="iconsax" icon-name="document-text-1"></i>
      <div>T & C</div>
    </div>
    <v-popUp v-bind="showPopUp" @shouldClosePopUp="popUpHandler($event)"></v-popUp>
  </div>
</template>
<script>
import { getMonth } from '@/utils/helpers'
import PopUp from '@/components/Common/PopUp'
import { getCookie, isLogged } from '@/utils/functions'
export default {
  name: 'LeftPanel',
  components: {
    'v-popUp': PopUp
  },
  data () {
    return {
      isHovering: false,
      ishomeHovering: false,
      isFixtureHovering: false,
      isPlayHovering: false,
      isContactHovering: false,
      isAboutHovering: false,
      isHelpHovering: false,
      isTnCHovering: false,
      showPopUp: {
        flag: false,
        login: false,
        otp: false,
        signUp: false
      },
      LoggedInHome: false,
      error: undefined,
      msg: 'Participate to play',
      showCard: undefined
    }
  },
  mounted () {
    if (isLogged() === false) {
      this.OpenPopUp(2)
    }
  },
  updated () {
  },
  methods: {
    isLogged () {
      let username = getCookie('username')
      if (username == null || username === undefined || username === '') {
        return false
      }
      return true
    },
    popUpHandler ($data) {
      console.log($data)
      console.log('pop up popUpHandler')
      this.showPopUp.flag = $data[1]
      document.body.style.overflow = 'auto'
    },
    OpenPopUp (data) {
      document.body.scrollTop = document.documentElement.scrollTop = 0
      document.body.style.overflow = 'hidden'
      if (data === 1) {
        this.showPopUp.login = true
        this.showPopUp.signUp = false
      }
      if (data === 2) {
        this.showPopUp.signUp = true
        this.showPopUp.login = false
      }
      this.showPopUp.flag = true
    },
    convertDateToMonth (date) {
      return getMonth(date)
    },
    getYear (date) {
      return date.substring(0, 4)
    },
    getDay (date) {
      return date.substring(8, 10)
    },
    redirectToHome () {
      this.$router.push('/')
    },
    redirectToProfile () {
      this.$router.push({ name: 'MyProfile' })
    },
    redirectToMyMatch () {
      this.$router.push({ name: 'MyMatch' })
    },
    redirectToTnc () {
      this.$router.push({ name: 'TnC' })
    },
    redirectToContactUs () {
      this.$router.push({ name: 'ContactUs' })
    },
    helpAndContactInstaPage () {
      const instagramUrl = 'https://www.instagram.com/play32Chess-battle'
      window.open(instagramUrl, '_blank')
    }
  }
}
</script>
<style scoped>
.home-img{
  width: 30px;
}
.current{
  font-weight: 500 !important;
  color: #ffffff !important;
}
.sign-up{
  border: 1px solid #FFFFFF;
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 6px;
  color: #fff !important;
  font-size: 16px;
  font-weight: 400;
}
.login{
  border: 1px solid #FFFFFF;
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 6px;
  color: #515151 !important;
  font-size: 16px;
  font-weight: 700 !important;
  background:#ffffff;
}
.logo{
  margin-bottom: 11%;
  font-weight: 400;
  cursor: pointer;
}
.main-logo {
  cursor: pointer;
}
</style>
