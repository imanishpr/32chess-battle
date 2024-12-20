<template>
  <div class="container">
    <div :class="{ 'sidebar m-left-panel': mobile(), 'left-panel': !mobile() }" id="m-left-panel">
      <v-LPanel></v-LPanel>
    </div>
    <div class="right-wide-panel-pay">
      <v-TopStrip/>
      <div class="nf-cont">
        <img class="img404" :src="notFoundImg" alt="not_found_pic" />
        <div class="right-404">
          <div class="right-404-text">Sorry, we were unable to find that page</div>
          <div class="home-button">
            <router-link class="router-button" :to="{ name: 'Home' }"> Expore other tournaments
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LeftPanel from '@/components/Common/LeftPanel'
import TopStripe from '@/components/Common/TopStripe'
import { isMobile } from '@/utils/helpers'
export default {
  name: 'PageNotFoundWeb',
  components: {
    'v-LPanel': LeftPanel,
    'v-TopStrip': TopStripe
  },
  data () {
    return {
      notFoundImg: 'https://res.cloudinary.com/parc-india/image/upload/v1645526405/Group_146_r4hzxk.png'
    }
  },
  mounted () {
    this.removeOverLay()
  },
  methods: {
    mobile () {
      return isMobile()
    },
    removeOverLay ($datae) {
      document.getElementById('overlay').style.display = 'none'
      this.pgn = $datae[1]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-panel div {
  font-size: 16px;
  display: block;
  color: #ffffff;
  font-weight: 400;
  font-family: 'Roboto';
  color: rgba(255, 255, 255, 0.5);
}
.right-wide-panel-pg{
  margin-left: 120px;
  font-size: 18px;
  background: #000000;
  display: inline-block;
  width: 100%;
  height: 100vh;
}
.notFound-cont{
  width: 100%;
    overflow: hidden;
    display: inline-block;
}
.left-img{
  width: 43%;
  text-align: right;
  float: left;
}
.right-404{
  color: #ffffff;
  text-align: center;
}
.right-404-text{
  font-size: 24px;
  font-family: 'Roboto';
  font-weight: 500;
  margin-top: 3%;
}
.home-button{
  padding: 1% 1%;
  border-radius: 5px;
  width: 30%;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 20px;
  font-size: 24px;
  font-family: 'Roboto';
  margin-left: 34%;
  font-weight: 500;
  margin-top: 3%;
}
.home-button a {
}
.nf-cont{
  display: grid;
  background: #;
  background: #262626;
  margin: 4% 10% 0 5%;
  text-align: center;
  border-radius: 10px;
  padding: 4% 0;
}
.img404{
  margin-left: 40%;
}
@media (min-width:320px) and (max-width: 500px) {
  .right-404-text {
      font-size: 85px;
  }
  .home-button{
      padding: 2% 2%;
      border-radius: 5px;
      width: 60%;
      margin-left: 13%;
  }
  .right-404 {
      width: 50%;
      float: left;
      padding-top: 14%;
      text-align: left;
      color: #ffffff;
  }
}
</style>
