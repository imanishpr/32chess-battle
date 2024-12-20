<template>
  <div class="container">
    <div :class="{ 'sidebar m-left-panel': mobile(), 'left-panel': !mobile() }" id="m-left-panel">
      <v-LPanel></v-LPanel>
    </div>
    <div class="right-wide-panel-pay">
      <div class="nf-cont">
        <img class="img404" :src="notFoundImg" alt="not_found_pic" />
        <div class="tnx">Thank you!</div>
        <div class="order-num">You have successfully participated in the tournaments.</div>
        <div class="right-404">
          <div class="right-404-text">Your tickets are on its way, you will get a SMS notification (Beta version does not support promotional messages)</div>
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
import { getPaymentStatusById } from '@/utils/functions'
import { isMobile } from '@/utils/helpers'
export default {
  name: 'ThankYouPage',
  components: {
    'v-LPanel': LeftPanel
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
    console.log(urlParams)
    const myParam = urlParams.get('id')
    this.txn = urlParams.get('transaction_id')
    console.log('hey')
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
.nf-cont{
  display: grid;
  background: #262626;
  margin: 4% 10% 0 5%;
  text-align: center;
  border-radius: 10px;
  padding: 4% 0;
}
.img404{
  margin-left: 47%;
  background: #fff;
  width: 36px;
  border-radius: 31px;
  padding: 15px;
}
.tnx{
  font-size: 64px;
  font-family: Poppins;
  font-weight: 700;
  color: #ffffff;
}
.order-num {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  font-size: 18px;
  font-family: 'Roboto';
  color: #ffffff;
  margin: 1% 43%;
  padding: 5px 5px;
}
</style>
