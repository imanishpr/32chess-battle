<template>
  <div class="container">
    <div :class="{ 'sidebar m-left-panel': mobile(), 'left-panel': !mobile() }" id="m-left-panel">
      <v-LPanel></v-LPanel>
    </div>
    <div class="right-wide-panel-edm">
      <v-TopStrip />
      <div class="card-main-cont-m">
        <div class="upcoming-text-m">
           My matches
        </div>
        <v-eventCard v-model=showCard></v-eventCard>
      </div>
    </div>
  </div>
</template>

<script>
import { isMobile } from '@/utils/helpers'
import { getMyUpcomingMatches, isLogged } from '@/utils/functions'
import MyMatchCard from '@/components/eventCard/MyMatchCard'
import LogIn from '@/components/login/Login'
import LeftPanel from '@/components/Common/LeftPanel'
import TopStripeMobile from '@/components/Common/TopStripeMobile'
export default {
  name: 'MyMatchMobile',
  components: {
    'v-eventCard': MyMatchCard,
    'v-Login': LogIn,
    'v-LPanel': LeftPanel,
    'v-TopStrip': TopStripeMobile
  },
  data () {
    return {
      sidebarPop: false,
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
      help: 'https://res.cloudinary.com/parc-india/image/upload/v1644001284/help_cjhk5t.png',
      popUpSign: '☰'
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
    },
    toggleSideBar () {
      if (this.sidebarPop === false) {
        this.popUpSign = 'X'
        this.sidebarPop = true
        document.getElementById('m-left-panel').style.width = '110px'
        console.log(this.popUpSign)
      } else {
        this.popUpSign = '☰'
        this.sidebarPop = false
        document.getElementById('m-left-panel').style.width = '0'
        console.log(this.popUpSign)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none !important;
}
.hello {
  margin: 7% 0;
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
@media (min-width:320px) and (max-width: 500px) {
pre {
  display: block;
  font-family: Schnyder S;
  white-space: pre;
  margin: 16% 0% 0% 5%;
  text-align: left;
}
.gallery-m {
display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  gap: 20px;
  background-color: #262626;
}
  .bar-logo-cont{
    position: absolute;
    width: 80%;
  }
  .bar-side-logo{
    position: relative;
    width: 27%;
    left: 7%;
    top: 17px;
  }
  .logo-img {
    width: 30px;
    padding: 3px 1px 1px 5px;
  }
  .sidebar {
    width: 0;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }
  .open-btn {
    font-size: 35px;
    cursor: pointer;
    position: relative;
    background-color: transparent;
    color: white;
    padding: 10px 15px;
    border: none;
    /* text-align: left; */
    z-index: 99;
    float: left;
  }
  .main-cont{
    width: 100%;
  }
  .left-panel div {
    font-size: 16px;
    display: block;
    color: #ffffff;
    font-weight: 400;
    font-family: 'Roboto';
    color: rgba(255, 255, 255, 0.5);
  }
  .m-right-wide-panel-mh{
font-size: 18px;
    background: #000000;
    display: inline-block;
    background: url(https://res.cloudinary.com/parc-india/image/upload/v1643988984/ChessBack_zubbnp.png) no-repeat;
    background-size: 134% 43%;
  }
  .m-right-top-holder{
    width: 100%;
    background-size: contain;
    /* margin: 4%; */
    text-align: left;
    /* padding: 2% 4%; */
    color: #ffffff;
    background-size: 52%px 100px;
    position: inherit;
    height: 260px;
  }
  .heading-1-m{
  color: #FFF;
  font-family: Schnyder S;
  font-size: 36px;
  font-style: normal;
  font-weight: 300;
  line-height: 101%; /* 36.36px */
  text-transform: capitalize;
  }
  .heading-2-m{
color: #FFF;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
    text-align: left;
    width: 75%;
    margin-left: 5%;
  }
.t-button-m{
background-color: #0072fd;
width: 43%;
padding: 1.5%;
margin: 5% 5%;
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 110%;
border-radius: 1px;
border-radius: 6px;
}
  .part-play-m{
  color: #FFF;
  font-family: Schnyder S;
  font-size: 36px;
  font-style: normal;
  font-weight: 300;
  line-height: 101%; /* 36.36px */
  text-transform: capitalize;
      margin-bottom: 4%;
  }
  .card-main-cont-m{
    padding: 1%;
    background: #262626;
    display: contents;
  }
  .upcoming-text-m{
  text-align: left;
  padding: 2%;
  color: #FFF;
  font-family: Roboto;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 101%;
  text-transform: capitalize;
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
}
.right-wide-panel-edm {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  overflow: auto;
  padding: 3px 5px 0px 5px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
}
</style>
