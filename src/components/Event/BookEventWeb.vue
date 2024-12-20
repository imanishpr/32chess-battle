<template>
  <div class="container">
    <div :class="{ 'sidebar m-left-panel': mobile(), 'left-panel': !mobile() }" id="m-left-panel">
      <v-LPanel></v-LPanel>
    </div>
    <div class="right-wide-panel-pay">
      <v-TopStrip/>
      <div class="main-cont">
          <div>
            <div v-if='eventDesc !==undefined' class="parent-container">
              <div class="left-container-pay">
                <img v-if='eventDesc !==undefined' class="event-desc-Img" :src="eventDesc.eventImgUrl" alt="EventImage" />
                <div className={styles.imgFilter} />
              </div>
              <div class="right-container-pay">
                <div>
                  <div class="event-name">Booking summary</div>
                </div>
                <div class="small-infos">
                  <div class="the-icons span3 icons-by-fontello" title="Code: 0xe800"><i class="iconsax" icon-name="location-tick"></i></div>
                  <div>{{eventDesc.eventVenue}}</div>
                </div>
                <div class="small-infos">
                <div class="the-icons span3 icons-by-fontello" title="Code: 0xf274"><i class="iconsax" icon-name="calendar-1"></i> </div>
                  <div>{{getDay(eventDesc.date)}}</div>
                </div>
                <div class="small-infos">
                   <div class="the-icons span3 icons-by-fontello" title="Code: 0xe803"><i class="iconsax" icon-name="clock"></i></div>
                  <div>{{eventDesc.timings}}</div>
                </div>
                <div class="small-infos">
                  <div class="the-icons span3 icons-by-fontello" title="Code: 0xe806"><i class="iconsax" icon-name="money-5"></i></div>
                  <div class="fees-name"> Tournament fees</div>
                  <div class="rupee-final">Rs. {{eventDesc.price}}</div>
                </div>
                <div class="small-infos">
                  <div class="the-icons span3 icons-by-fontello" title="Code: 0xe806"><i class="iconsax" icon-name="money-5"></i></div>
                  <div class="fees-name"> Beta-user-discount</div>
                  <div class="rupee-final">Rs. -9</div>
                </div>
                <div class="small-infos-hor">
                </div>
                <div class="small-infos">
                  <div class="fees-name"> Sub total</div>
                  <div class="rupee-final">Rs. 0</div>
                </div>
                <div class="small-infos-payable">
                  <div class="fees-name">Amount Payable</div>
                  <div class="rupee-final">Rs. 0</div>
                </div>
                <div class="participate-button">
                  <button class="pay-button" v-on:click="finalPay">proceed</button>
                </div>
              </div>
            </div>
            <div class="details"></div>
            <div class="event-desc-main">
            </div>
          </div>
        </div>
    </div>
  </div>
<!--   <div>
    <div class="" v-if='allPriceDetails !== undefined && completed === false'>
      <div class="card" v-for="(x, index) in allPriceDetails.priceDetails" :key="x.eventId">
        <button class="date-year" v-on:click="loadCategorySpecificDetails(index)">{{getMatchCategoryAsInGirlsBoys(index)}}</button>
      </div>
      <div class="price-details" v-if='categorySpecificDetails !== undefined' v-for="x in categorySpecificDetails" :key="x.eventId">
        <div :data-id="x.priceId">
          <div>{{x.name}}</div>
          <div>{{x.currency}}</div>
          <div>{{x.priceAmount}}</div>
          <div>{{x.desc}}</div>
          <div className={styles.addsubContainer}>
            <button className={styles.addsub} v-on:click="decrementAmount(x.priceId, x.priceAmount, x.name, x.priceId, x.category)">
                          &#8211;
            </button>
            <input
              className={styles.qtyInput}
              type="number"
              :name="x.priceAmount"
              :id="x.priceId"
              :value="getQtyForCat(x.priceId)"
              @input="addEvent($event, x.category, x.name)"
            />
            <button className={styles.addsub} v-on:click="incrementAmount(x.priceId, x.priceAmount, x.name, x.priceId, x.category)">
                          +
            </button>
          </div>
        </div>
      </div>
      <button className={styles.nextButton} v-if='showNextButton == true'  v-on:click="proceed()">
          Next
      </button>
    </div>
    <div class="" v-if='completed === true'>
      <div class="price-details1" v-for="(x, index) in playerCountState" :key="index">
        <div v-if='x.qty > 0 '>{{x.name}} | {{getMatchCategoryAsInGirlsBoys(x.catId)}}</div>
          <div className={styles.addsubContainer} v-if='x.qty > 0'>
            <button className={styles.addsub} v-on:click="decrementAmount(x.priceId, x.amount, x.name, x.priceId, x.catId, true)">
                          &#8211;
            </button>
            <input
              class=""
              type="number"
              :name="x.amount"
              :id="x.priceId"
              :value="x.qty"
              @input="addEvent($event, x.catId, x.name)"
            />
            <button className={styles.addsub} v-on:click="incrementAmount(x.priceId, x.amount, x.name, x.priceId, x.catId, true)">
                          +
            </button>
          </div>
          <div v-for="y in x.qty" :key="y">
            <input
              :class="playerNamesClass + x.priceId"
              type="text"
              :name="x.name"
              :id="x.priceId*y"
            />
          </div>
      </div>
      <div v-if='completed === true' class="tAmount">{{totalAmount}}</div>
      <button class="pay-online" v-on:click="finalPay()">Proceed to pay</button>
    </div>
  </div> -->
</template>

<script>
import { getEventById, bookEvent, getCookie } from '@/utils/functions'
import LeftPanel from '@/components/Common/LeftPanel'
import { isMobile, trackEvent } from '@/utils/helpers'
import TopStripe from '@/components/Common/TopStripe'
export default {
  name: 'BookEventWeb',
  components: {
    'v-LPanel': LeftPanel,
    'v-TopStrip': TopStripe
  },
  data () {
    return {
      eventDesc: this.$store.state.eventList[this.$route.params.id]
    }
  },
  updated () {
    console.log(this.eventDesc)
    // if (this.allPriceDetails !== undefined && this.currId === undefined && this.loadedOnce === false) {
    //   this.loadedOnce = true
    //   this.categorySpecificDetails = this.allPriceDetails.priceDetails[Object.keys(this.allPriceDetails.priceDetails)[0]]
    // }
    // if (this.lastPage === true && this.totalAmount < 10) {
    //   this.completed = false
    //   this.$forceUpdate()
    //   this.lastPage = false
    // }
  },
  beforeMount () {
  },
  mounted () {
    if (this.eventDesc === undefined) {
      getEventById('get', this.$route.params.id, '').then(response => (this.eventDesc = response.data.response)).catch(err => { this.error = err.response })
    }
    this.removeOverLay()
  },
  methods: {
    mobile () {
      return isMobile()
    },
    getDay (date) {
      return date.split('T')[0]
    },
    // getMatchCategoryAsInGirlsBoys (id) {
    //   return gameConfig[id]
    // },
    // loadCategorySpecificDetails (id) {
    //   this.currId = id
    //   console.log('yes updaing import')
    //   if (this.allPriceDetails !== undefined) {
    //     this.categorySpecificDetails = this.allPriceDetails.priceDetails[id]
    //   }
    // },
    // checkStatustoShowNextButton () {
    //   if (universalPlayerCount > 0) {
    //     this.showNextButton = true
    //   } else {
    //     this.showNextButton = false
    //   }
    // },
    // decrementAmount (id, amount, name, priceId, categoryId, lastPage = false) {
    //   if (this.totalAmount < 10) {
    //     this.completed = false
    //     this.$forceUpdate()
    //   }
    //   if (Number(document.getElementById(id).value) > 0) {
    //     document.getElementById(id).value = Number(document.getElementById(id).value) - 1
    //     universalPlayerCount -= 1
    //     let myCatIndex = -1
    //     for (let i = 0; i < playerCount.length; i++) {
    //       if (playerCount[i].catId === categoryId && playerCount[i].name === name && playerCount[i].priceId === priceId) {
    //         myCatIndex = i
    //       }
    //     }
    //     if (myCatIndex === -1) {
    //       playerCount.push({
    //         qty: Number(document.getElementById(id).value),
    //         amount,
    //         catId: categoryId !== undefined ? categoryId : undefined,
    //         name,
    //         priceId
    //       })
    //     } else {
    //       playerCount[myCatIndex] = {
    //         qty: Number(document.getElementById(id).value),
    //         amount,
    //         catId: categoryId !== undefined ? categoryId : undefined,
    //         name,
    //         priceId
    //       }
    //     }
    //     console.log(this.qtyCat)
    //     console.log(priceId)
    //     console.log(Number(document.getElementById(id).value))
    //     this.qtyCat[priceId] = Number(document.getElementById(id).value)
    //     console.log(this.playerCountState)
    //     if (lastPage === true) {
    //       this.lastPage = true
    //     }
    //   }
    //   this.calculateTotal()
    //   this.checkStatustoShowNextButton()
    // },
    // incrementAmount (id, amount, name, priceId, categoryId, lastPage = false) {
    //   this.calculateTotal()
    //   if (this.totalAmount < 10) {
    //     this.completed = false
    //     this.$forceUpdate()
    //   }
    //   if (Number(document.getElementById(id).value) < 11) {
    //     document.getElementById(id).value = Number(document.getElementById(id).value) + 1
    //     universalPlayerCount += 1
    //     let myCatIndex = -1
    //     for (let i = 0; i < playerCount.length; i++) {
    //       if (playerCount[i].catId === categoryId && playerCount[i].name === name && playerCount[i].priceId === priceId) {
    //         myCatIndex = i
    //       }
    //     }
    //     if (myCatIndex === -1) {
    //       playerCount.push({
    //         qty: Number(document.getElementById(id).value),
    //         amount,
    //         catId: categoryId !== undefined ? categoryId : undefined,
    //         name,
    //         priceId
    //       })
    //     } else {
    //       playerCount[myCatIndex] = {
    //         qty: Number(document.getElementById(id).value),
    //         amount,
    //         catId: categoryId !== undefined ? categoryId : undefined,
    //         name,
    //         priceId
    //       }
    //     }
    //     console.log(this.qtyCat)
    //     console.log(priceId)
    //     console.log(Number(document.getElementById(id).value))
    //     this.qtyCat[priceId] = Number(document.getElementById(id).value)
    //     this.playerCountState = playerCount
    //     console.log(this.playerCountState.length)
    //     if (lastPage === true) {
    //       this.lastPage = true
    //     }
    //   }
    //   this.calculateTotal()
    //   if (lastPage === true) {
    //     this.$forceUpdate()
    //   }
    //   this.checkStatustoShowNextButton()
    // },
    // addEvent (e, val, underCat) {
    //   if (val === undefined) {
    //     return
    //   }
    //   console.log(val)
    //   if (e.target.value > 10) {
    //     alert('Max 10 possible')
    //     e.target.value = 0
    //   } else if (e.target.value < 0) {
    //     alert('Enter atleast one')
    //     e.target.value = 0
    //   } else {
    //     let myCatIndex = -1
    //     for (let i = 0; i < playerCount.length; i++) {
    //       if (playerCount[i].catId === val && playerCount[i].priceId === Number(e.target.id)) {
    //         myCatIndex = i
    //       }
    //     }
    //     console.log(playerCount, myCatIndex, val, 'index')
    //     if (myCatIndex === -1) {
    //       playerCount.push({
    //         qty: Number(e.target.value),
    //         amount: e.target.name,
    //         catId: val,
    //         name: underCat,
    //         priceId: Number(e.target.id)
    //       })
    //     } else {
    //       playerCount[myCatIndex] = {
    //         qty: Number(e.target.value),
    //         amount: e.target.name,
    //         catId: val,
    //         name: underCat,
    //         priceId: Number(e.target.id)
    //       }
    //     }
    //     this.qtyCat[e.target.id] = Number(e.target.value)
    //     this.playerCountState = playerCount
    //   }
    //   universalPlayerCount += Number(e.target.value)
    //   this.checkStatustoShowNextButton()
    // },
    // getQtyForCat (catId) {
    //   if (this.qtyCat[catId] === undefined) {
    //     return 0
    //   }
    //   return this.qtyCat[catId]
    // },
    // calculateTotal () {
    //   totalAmount = 0
    //   for (let i = 0; i < this.playerCountState.length; i++) {
    //     totalAmount += this.playerCountState[i].qty * this.playerCountState[i].amount
    //   }
    //   this.totalAmount = totalAmount
    // },
    // proceed () {
    //   this.completed = true
    //   console.log(this.playerCountState)
    // },
    redirectToPay (response) {
      console.log(response.data.response)
      if (response.data.response.errorMsg === 'ERROR') {
        alert('Some error occured please try once more')
        window.location.reload()
      } else if (response.data.response.errorMsg === 'B_ERROR') {
        alert('We already have a booking under process for you  or slots are full, please wait for Sometime !!')
        window.location.reload()
      } else {
        window.location = response.data.response.errorMsg
      }
    },
    removeOverLay () {
      document.getElementById('overlay').style.display = 'none'
    },
    isLogged () {
      let username = getCookie('username')
      if (username == null || username === undefined || username === '') {
        return false
      }
      return true
    },
    finalPay () {
      trackEvent('finalPay-button', 'finalPay', 'finalPay-web', 1)
      if (!this.isLogged()) {
        alert('Please login first !!!')
        this.$router.push({ name: 'Home' })
      }
      document.getElementById('overlay').style.display = 'block'
      const paymentObject = {}
      paymentObject.eventId = this.eventDesc.eventId
      paymentObject.userId = ''
      paymentObject.email = ''
      paymentObject.phone = ''
      paymentObject.totalAmount = this.eventDesc.price
      paymentObject.priceDetail = []
      console.log(this.playerCountState)
      console.log(paymentObject)
      bookEvent('post', paymentObject, '')
        .then(response => (
          this.redirectToPay(response)
        ))
        .catch(err => { this.error = err.response })
    }
  }
}
</script>
<style type="text/css" scoped>

.main-cont {
  background-color: #262626;
  border-radius: 10px;
}
.parent-container {
  color: #ffffff;
  padding: 2% 2%;
}
.left-container-pay {
  width: 45%;
  float: left;
  border: 12px solid;
  filter: drop-shadow(2px 3px 4px rgba(0, 0, 0, 0.25));
  border-radius: 8px;
}
.event-desc-Img {
  width: 100%;
  border-radius: 14px;
}
.right-container-pay {
  width: 43%;
  font-family: 'Poppins';
  float: right;
  text-align: left;
  padding: 1% 2% 1% 3%;
}
.event-name {
  font-size: 30px;
  font-weight: 500;
  text-transform: capitalize;
}
.small-infos {
  margin: 3% 0 3% 0;
  font-size: 14px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
}
.icons-by-fontello {
  float: left;
  margin: 0 3% 0 0;
}
.float-left {
  float: left;
  margin: 0 4% 0 0;
}
.icon-whatsapp {
  color: #4FCE5D;
  font-size: 150%;
}
.icon-facebook-official {
  color: #3b5998;
  font-size: 150%;
}
.icon-instagram-1 {
  color: #3f729b;
  font-size: 150%;
}
.icon-twitter {
  color: #00acee;
  font-size: 150%;
}
.pay-button {
  clear: both;
  outline: none;
  text-decoration: none;
  text-align: center;
  text-transform: capitalize;
  background: #FFFFFF;
  border-radius: 15px;
  color: #000000;
  margin-top: 6%;
  width: 100%;
  background: #FFFFFF;
  border-radius: 15px;
  padding: 1% 1%;
  border: none;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  cursor: pointer;
}
.router-button {
  text-decoration: none;
  font-size: 24px;
  font-family: Poppins;
  font-style: normal;
  display: inline-block;
  font-weight: 500;
}
.event-desc-main {
  clear: both;
  padding: 2% 2%;
  color: #fff;
  text-align: left;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
}
.details {
  clear: both;
  padding: 2% 2%;
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  text-decoration: underline;
  text-align: left;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
}
.fees-name{
  font-size: 18px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  float: left;
}
.rupee-final {
  font-size: 18px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  padding-left: 80%;
}
.small-infos-hor{
  border-bottom: 1px solid;
}
.small-infos-payable {
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 4px 3px 4px rgb(0 0 0 / 25%);
  border-radius: 5px;
  padding: 1% 1%;
}
.small-infos .iconsax {
    font-size: 18px;
}
</style>
