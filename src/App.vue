
<template>
  <div id="app">
    <div class="over-lay" id="overlay">
      <div class="span3" title="Code: 0xe834">
        <i class="demo-icon icon-spin4 animate-spin">&#xe834;</i>
      </div>
    </div>
<!--     <div class="header-container">
      <div class="left-header">
        <router-link :to="{ name: 'Home' }">
          <img class="logo-img" src="./assets/logo.png" width="70">
          <div class="company-name">{{ msg }}</div>
      </router-link>
      </div>
      <div class="right-header">
      <div v-if='LoggedInHome == false'>
        <v-Login></v-Login>
      </div>
      <div v-if='LoggedInHome == true'>
      <router-link :to="{ name: 'MyProfile' }">
        <div class="the-icons span3 icons-by-fontello xx" title="Code: 0xe801"><i class="demo-icon icon-adult">&#xe801;</i>
        </div>
      </router-link>
      <router-link :to="{ name: 'Fixture' }">
        <div>
          <img class="logo-img-fix" src="https://res.cloudinary.com/parc-india/image/upload/v1640198570/fixture_new_dqtajj.png" width="45">
        </div>
      </router-link>
      </div>
      </div>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
import LogIn from '@/components/login/Login'
import { getCookie } from '@/utils/functions'
export default {
  name: 'App',
  components: {
    'v-Login': LogIn
  },
  data () {
    return {
      LoggedInHome: false,
      msg: '32Chess-battle'
    }
  },
  updated () {
    if (getCookie('loggedIn')) {
      this.LoggedInHome = true
    }
  },
  mounted () {
    if (getCookie('loggedIn')) {
      this.LoggedInHome = true
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cormorant&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;1,200;1,300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;1,400;1,700&display=swap');
@import url('https://iconsax.gitlab.io/i/icons.css');
@font-face {
  font-family: 'fontello';
  src: url('./font/fontello.eot?309450');
  src: url('./font/fontello.eot?309450#iefix') format('embedded-opentype'),
       url('./font/fontello.woff?309450') format('woff'),
       url('./font/fontello.ttf?309450') format('truetype'),
       url('./font/fontello.svg?309450#fontello') format('svg');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'SchnyderS-Light';
  src: url('./font/SchnyderS-Light.otf');
  font-weight: normal;
  font-style: normal;
}
body {
  margin: 0;
  padding: 0;
  overflow: auto; /* Prevent browser default margin/padding */
  background-color: #000000;
}
#app {
  font-family: 'Nunito Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.header-container {
  width: 100%;
  float:left;
  background: #000000;
}

.left-panel{
    width: 200px; /* Fixed width for left menu */
    min-width: 200px; /* Ensure a minimum width */
    background-color: #333;
    color: #fff;
    padding: 20px;
    box-sizing: border-box;
}

.right-wide-panel-pay{
-webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    overflow: auto;
    padding: 2px 20px 20px 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 800px;
}
.container {
  display: flex;
  height: 100vh; /* Full viewport height */
}
.over-lay{
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: .7;
  z-index: 9999;
  padding-top: 20%;
  position: fixed;
  font-size: 50px;
  font-weight: 800;
  color: #fff;
  margin-top: -1%;
}
.left-header {
  float: left;
  width: 50%;
  text-align: left;
}
.right-header {
  text-align: right;
  width: 40%;
  /* position: relative; */
  float: right;
  margin: 1.5% 3%;
}
.company-name {
  font-size: 31px;
  color: #FFFFFF;
  font-weight: 900;
  padding: 15px 15px;
  margin: 0 0 0 71px;
}
.logo-img {
  width: 85px;
  padding: 3px 1px 1px 5px;
}
.my-name{
  font-size: 17px !important;
  font-family: 'Arial' !important;
  margin-bottom: 20%;
  margin-top: 4%;
  font-weight: 700 !important;
  color: #ffffff !important;
}
.iconsax {
  font-size: 33px;
}

.strip {
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #ffffff;
}

.user-info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #262626;
  padding: 4px 18px;
  margin: 0px 15px;
  border-radius: 10px;
  cursor: pointer;
}
.no-display {
  display: none;
}
.user-info img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.logout {
  cursor: pointer;
  position: relative;
}
.strip .iconsax {
  font-size: 20px;
  color: #ffffff;
  font-weight: 900;
}
.logout:hover .tooltip {
  display: block;
}
 .tooltip {
    display: none;
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 4px;
    border-radius: 5px;
    top: 100%;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    white-space: nowrap;
    opacity: .8;
    font-size: 12px;
}

@media (min-width:320px) and (max-width: 500px) {
  .m-left-panel {
    height: 100vh;
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
  .m-right-wide-panel{
    font-size: 18px;
    background: #000000;
    display: inline-block;
  }
  .m-right-top-holder{
background: url(https://res.cloudinary.com/parc-india/image/upload/v1643988984/ChessBack_zubbnp.png) no-repeat;
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
  .heading-1{
position: relative;
    top: 79px;
    font-size: 45px;
    width: 355px;
    font-weight: 300;
    line-height: 50px;
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
  .logo {
    color: #ffffff;
  }
  .iconsax {
    font-size: 25px;
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
/*
   Animation example, for spinners
*/
.animate-spin {
  -moz-animation: spin 2s infinite linear;
  -o-animation: spin 2s infinite linear;
  -webkit-animation: spin 2s infinite linear;
  animation: spin 2s infinite linear;
  display: inline-block;
}
@-moz-keyframes spin {
  0% {
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -moz-transform: rotate(359deg);
    -o-transform: rotate(359deg);
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
@-webkit-keyframes spin {
  0% {
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -moz-transform: rotate(359deg);
    -o-transform: rotate(359deg);
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
@-o-keyframes spin {
  0% {
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -moz-transform: rotate(359deg);
    -o-transform: rotate(359deg);
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
@-ms-keyframes spin {
  0% {
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -moz-transform: rotate(359deg);
    -o-transform: rotate(359deg);
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
@keyframes spin {
  0% {
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -moz-transform: rotate(359deg);
    -o-transform: rotate(359deg);
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
.demo-icon {
  color: #fff;
  font-family: "fontello";
  font-style: normal;
  font-weight: normal;
  speak: never;
  font-size: 40px;
  display: inline-block;
  text-decoration: inherit;
  width: 1em;
  margin-right: .2em;
  text-align: center;
  /* opacity: .8; */
  /* For safety - reset parent styles, that can break glyph codes*/
  font-variant: normal;
  text-transform: none;
  /* fix buttons height, for twitter bootstrap */
  line-height: 1em;
  /* Animation center compensation - margins should be symmetric */
  /* remove if not needed */
  margin-left: .2em;
  /* You can be more comfortable with increased icons size */
  /* font-size: 120%; */
  /* Font smoothing. That was taken from TWBS */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* Uncomment for 3D effect */
  /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
}
</style>
