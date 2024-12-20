<template>
  <div class="container">
    <div class="left-panel">
      <v-LPanel></v-LPanel>
    </div>
    <div class="right-wide-panel-pay">
      <v-TopStrip />
      <div class="right-top-holder">
        <div class="heading-1">
          Chess Is The Gymnastics Of Intelligence
        </div>
        <div class="heading-2">
          Be a member of our chess club and participate in online tournaments with players from all over India.
        </div>
        <div class="t-button">
          Beta Version
        </div>
      </div>
      <div class="part-play">Participate to play</div>
      <div class="upcoming-text">
        Upcoming Tournaments
      </div>
      <v-eventCard v-model=showCard></v-eventCard>
    </div>
  </div>
</template>

<script>
import { getCookie, getEvents } from '@/utils/functions'
import { isMobile } from '@/utils/helpers'
import EventCard from '@/components/eventCard/EventCard'
import LogIn from '@/components/login/Login'
import LeftPanel from '@/components/Common/LeftPanel'
import TopStripe from '@/components/Common/TopStripe'
export default {
  name: 'HomeWeb',
  components: {
    'v-eventCard': EventCard,
    'v-Login': LogIn,
    'v-LPanel': LeftPanel,
    'v-TopStrip': TopStripe
  },
  data () {
    return {
      isHovering: false,
      LoggedInHome: false,
      error: undefined,
      msg: 'Participate to play',
      showCard: {},
      img: 'https://i.stack.imgur.com/ATB3o.gif',
      homeImg: 'https://res.cloudinary.com/parc-india/image/upload/v1643739258/Vector_qyzdiy.png',
      stands: 'https://res.cloudinary.com/parc-india/image/upload/v1644046460/Union_xw7oos.svg',
      play: 'https://res.cloudinary.com/parc-india/image/upload/v1644001095/play_qezyab.png',
      callus: 'https://res.cloudinary.com/parc-india/image/upload/v1644001284/call_azb95f.png',
      aboutUs: 'https://res.cloudinary.com/parc-india/image/upload/v1644001284/about_nunadf.png',
      help: 'https://res.cloudinary.com/parc-india/image/upload/v1644001284/help_cjhk5t.png'
    }
  },
  updated () {
    if (getCookie('loggedIn')) {
      this.LoggedInHome = true
    }
    this.$store.commit('saveEventList', this.showCard)
    console.log(this.showCard)
    console.log(this.$store.state.eventList)
  },
  beforeMount () {
    console.log(this.$store.state.eventList)
    if (getCookie('loggedIn')) {
      this.LoggedInHome = true
    }
  },
  mounted () {
    getEvents('get', '', '').then(response => (this.showCard = response.data.response)).catch(err => { this.error = err.response })
    if (getCookie('loggedIn')) {
      this.LoggedInHome = true
    }
    document.getElementById('overlay').style.display = 'none'
  },

  methods: {
    mobile () {
      return isMobile()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-cont{
  width: 100%;
}
.right-wide-panel{
  margin-left: 120px;
  font-size: 18px;
  background: #000000;
  display: inline-block;
}
.right-top-holder{
    background: url(https://res.cloudinary.com/parc-india/image/upload/v1643988984/ChessBack_zubbnp.png) no-repeat;
    height: 428px;
    background-size: auto;
    text-align: left;
    padding: 2% 4%;
    color: #ffffff;
}
.heading-1{
  font-size: 54px;
  width: 355px;
  font-weight: 300;
  line-height: 54px;
  font-family: 'SchnyderS-Light';
}
.heading-2{
  width: 270px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  padding-top: 3%;
  line-height: 110%;
}
.t-button{
  background-color: #0072fd;
  width: 131px;
  padding: 1.5%;
  margin-top: 4%;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 110%;
}
.part-play{
  font-family: 'SchnyderS-Light';
  font-style: normal;
  font-weight: 300;
  font-size: 64px;
  line-height: 101%;
  text-transform: capitalize;
  color: #fff;
}
.card-main-cont{
  margin: 4%;
  padding: 1%;
  background: #262626;
  display: inline-block;
}
.upcoming-text{
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 101%;
  font-family: 'Roboto', sans-serif;
  color: #ffffff;
  text-align: left;
  padding: 2%;
}
a {
  text-decoration: none !important;
}

h1, h2 {
  font-weight: 800;
  color: #000000;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
