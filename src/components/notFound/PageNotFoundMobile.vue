<template>
  <div class="container">
    <div :class="{ 'sidebar m-left-panel': mobile(), 'left-panel': !mobile() }" id="m-left-panel">
      <v-LPanel></v-LPanel>
    </div>
    <div class="right-wide-panel-cpm">
      <v-TopStrip />
      <div class="nf-cont-m">
        <img class="img404" :src="notFoundImg" alt="not_found_pic" />
      </div>
      <div class="right-404-m">
        <div class="right-404-text-m">Sorry, we were unable to find that page</div>
        <div class="home-button-m">
          <router-link class="router-button" :to="{ name: 'Home' }"> Expore other tournaments
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LeftPanel from '@/components/Common/LeftPanel'
import TopStripeMobile from '@/components/Common/TopStripeMobile'
import { isMobile } from '@/utils/helpers'
export default {
  name: 'PageNotFoundWeb',
  components: {
    'v-LPanel': LeftPanel,
    'v-TopStrip': TopStripeMobile
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
.nf-cont-m{
  display: flex;
  background: #;
  background: #262626;
  text-align: center;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
}
.img404-m{
  max-width: 100%;
  max-height: 100%;
}
.right-404-text-m {
  font-size: 24px;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 21px;
  color: #ffffff;
}
.home-button-m{
  padding: 2% 2%;
  border-radius: 5px;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 20px;
  font-size: 24px;
  font-family: 'Roboto';
  font-weight: 500;
  margin-top: 3%;
}
</style>
