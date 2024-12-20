<template>
  <div class="container">
    <div :class="{ 'sidebar m-left-panel': mobile(), 'left-panel': !mobile() }" id="m-left-panel">
      <v-LPanel></v-LPanel>
    </div>
    <div class="right-wide-panel-cpm">
      <v-TopStrip />
      <div class="nf-cont-m">
        <img class="img404-m" :src="notFoundImg" alt="not_found_pic" />
      </div>
              <div class="tnx">Thank you!</div>
        <div class="order-num-m">You have successfully participated in the tournaments.</div>
        <div class="right-404">
          <div class="right-404-text-m">Your tickets are on its way, you will get a SMS notification (Beta version does not support promotional messages)</div>
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
import { getPaymentStatusById } from '@/utils/functions'
import { isMobile } from '@/utils/helpers'
import TopStripeMobile from '@/components/Common/TopStripeMobile'
export default {
  name: 'ThankYouMobile',
  components: {
    'v-LPanel': LeftPanel,
    'v-TopStrip': TopStripeMobile
  },
  data () {
    return {
      notFoundImg: 'https://res.cloudinary.com/parc-india/image/upload/v1645529933/Vector-4_dgaqdk.png',
      status: 'not',
      txn: ''
    }
  },
  beforeMount () {
  },
  mounted () {
    this.removeOverLay()
    const urlParams = new URLSearchParams(window.location.search)
    const myParam = urlParams.get('id')
    this.txn = urlParams.get('transaction_id')
    getPaymentStatusById('get', myParam).then(response => (this.status = response.data.response.errorMsg)).catch(err => { this.error = err.response })
  },
  methods: {
    mobile () {
      return isMobile()
    },
    removeOverLay ($datae) {
      try {
        document.getElementById('overlay').style.display = 'none'
        this.pgn = $datae[1]
      } catch (err) {
        console.log(err)
      }
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
.right-wide-panel-th{
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
  background: #ffffff;
  width: 27px;
  border-radius: 35px;
  padding: 10px 10px;
}
.tnx{
  font-size: 64px;
  font-family: Poppins;
  font-weight: 700;
  color: #ffffff;
}
.order-num-m {
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  font-family: 'Roboto';
  color: #ffffff;
  width: 100%;
  padding: 5px 5px;
}
.right-wide-panel-cpm{
  background-color: #262626;
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
