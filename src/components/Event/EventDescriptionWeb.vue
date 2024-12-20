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
              <div class="left-container">
                <img v-if='eventDesc !==undefined' class="event-desc-Img" :src="eventDesc.eventImgUrl" alt="EventImage" />
                <div className={styles.imgFilter} />
              </div>
              <div class="right-container">
                <div>
                  <div class="event-name">{{eventDesc.eventName}}</div>
                </div>
                <div class="small-infos">
                  <div class="the-icons span3 icons-by-fontello" title="Code: 0xe800"><i class="iconsax" icon-name="location-tick"></i></div>
                  <div>{{eventDesc.eventVenue}}</div>
                </div>
                <div class="small-infos">
                  <div class="the-icons span3 icons-by-fontello" title="Code: 0xe801"><i class="iconsax" icon-name="users"></i>
                  </div>
                  <div>
                    Organizer : {{eventDesc.organizers.join(", ")}}
                  </div>
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
                  <div> Rs. {{eventDesc.price}} onwords</div>
                </div>

                <div class="small-infos">
                  <div class="the-icons span3 icons-by-fontello" title="Code: 0xe808"><i class="iconsax" icon-name="phone-ringing"></i></div>
                  <div>{{eventDesc.phone}}</div>
                </div>
<!--                 <div class="small-infos">
                  <div class="the-icons span3 float-left" title="Code: 0xf232"><i class="demo-icon icon-whatsapp">&#xf232;</i> </div>
                  <div class="the-icons span3 float-left" title="Code: 0xf230"><i class="demo-icon icon-facebook-official">&#xf230;</i></div>
                  <div class="the-icons span3 float-left" title="Code: 0xf32d"><i class="demo-icon icon-instagram-1">&#xf32d;</i> </div>
                  <div class="the-icons span3 float-left" title="Code: 0xf099"><i class="demo-icon icon-twitter">&#xf099;</i> </div>
                </div> -->
                <div class="participate-button">
                  <router-link class="router-button" :to="{ name: 'BookEvent', params: { id: eventDesc.eventId }}"> Participate now
                  </router-link>
                </div>
              </div>
            </div>
            <div class="details">Rules and Description</div>
            <div class="event-desc-main" v-html="eventDesc.description"></div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { getEventById } from '@/utils/functions'
import LeftPanel from '@/components/Common/LeftPanel'
import { isMobile } from '@/utils/helpers'
import TopStripe from '@/components/Common/TopStripe'
export default {
  name: 'EventDescriptionWeb',
  components: {
    'v-LPanel': LeftPanel,
    'v-TopStrip': TopStripe
  },
  data () {
    return {
      eventDesc: this.$store.state.eventList[this.$route.params.id],
      eventDescImgUrl: undefined,
      sidebarPop: false,
      popUpSign: '☰'
    }
  },
  beforeMount () {
  },
  beforeCreate () {
  },
  mounted () {
    if (this.eventDesc === undefined) {
      getEventById('get', this.$route.params.id, '').then(response => (this.eventDesc = response.data.response)).catch(err => { this.error = err.response })
    }
    document.getElementById('overlay').style.display = 'none'
  },
  methods: {
    mobile () {
      return isMobile()
    },
    getDay (date) {
      return date.split('T')[0]
    }
  },
  updated () {
    if (this.eventDesc !== undefined) {
      this.eventDescImgUrl = this.eventDesc.eventImgUrl
    }
  }
}
</script>
<style type="text/css" scoped>
.small-infos .iconsax {
    font-size: 18px;
}
.main-cont {
  background-color: #262626;
  border-radius: 10px;
}
.parent-container {
  color: #ffffff;
  padding: 2% 2%;
}
.left-container {
  width: 50%;
  float: left;
}
.event-desc-Img {
  width: 100%;
  border-radius: 14px;
}
.right-container {
  width: 43%;
  font-family: 'Poppins';
  float: right;
  text-align: left;
  padding: 1% 2% 1% 3%;
  /* background: #222; */
  background: radial-gradient(95.47% 95.47% at 50% 37.2%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(
  180deg
  , rgba(0, 0, 0, 0.2) -15.06%, rgba(0, 0, 0, 0.175) 26.81%, rgba(0, 0, 0, 0.0187023) 74.17%, rgba(0, 0, 0, 0) 116.73%), #5F5F5F;
  border-radius: 14px;
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
.participate-button {
  clear: both;
  outline: none;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  background: #FFFFFF;
  border-radius: 15px;
  color: #000000;
  margin-top: 13%;
  margin-bottom: 5%;
  padding: 10px 0;
}
.router-button {
  text-decoration: none;
  font-size: 24px;
  font-family: Poppins;
  font-style: normal;
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
</style>
