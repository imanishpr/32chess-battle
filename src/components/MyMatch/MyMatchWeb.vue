<template>
  <div class="container">
    <div class="left-panel">
      <v-LPanel></v-LPanel>
    </div>
    <div class="right-wide-panel-pay">
      <v-TopStrip />
      <div class="upcoming-text">
        My matches
      </div>
      <v-eventCard v-model=showCard></v-eventCard>
    </div>
  </div>
</template>

<script>
import { isMobile } from '@/utils/helpers'
import MyMatchCard from '@/components/eventCard/MyMatchCard'
import { getMyUpcomingMatches, isLogged } from '@/utils/functions'
import LogIn from '@/components/login/Login'
import LeftPanel from '@/components/Common/LeftPanel'
import TopStripe from '@/components/Common/TopStripe'
export default {
  name: 'MyMatchWeb',
  components: {
    'v-eventCard': MyMatchCard,
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
      showCard: this.$store.state.eventList1,
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
    this.$store.commit('saveEventList1', this.showCard)
  },
  beforeMount () {
    if (isLogged() === false) {
      this.$router.push({ name: 'Home' })
    }
    if (this.showCard === undefined || this.showCard === {} || this.showCard.eventid === undefined) {
      getMyUpcomingMatches('get', '', '').then(response => (this.showCard = response.data.response)).catch(err => { this.doSomethingElseFoeError(err.response) })
      this.$store.commit('saveEventList1', this.showCard)
    } else {
      this.showCard = this.$store.state.eventList1
    }
  },
  mounted () {
    document.getElementById('overlay').style.display = 'none'
  },
  methods: {
    doSomethingElseFoeError (response) {
      console.log(response)
      if (response.data.code === 500 || response.data.response === null || response.data.response === undefined || (response.data.error !== undefined && response.data.error === 'NO-FIXTURE-FOUND')) {
        alert('Please login first and go to My Matches menu')
        return
      }
      document.getElementById('overlay').style.display = 'none'
    },
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
