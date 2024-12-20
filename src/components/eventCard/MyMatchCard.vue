<template>
  <div :class="{ 'gallery-m': mobile(), 'gallery': !mobile() }">
    <!-- <div v-if='value == undefined || value.eventId === undefined'>You have not paricipated in any match. Please Join matches!!</div> -->
    <div :class="{ 'card-m': mobile(), 'card': !mobile() }" v-if='value !== undefined' v-for="(x, index) in value" :key="x.eventId + index">
      <router-link v-if="x.matchId!==0" :to="{ name: 'Fixture', params: { id: x.eventId }}" target="_blank">
        <div :id=x.eventId>
            <div class="timing">{{x.timings}}</div>
            <img class="img" :src=x.eventImgUrl alt="EventImage" />
            <div class="details-line">
              <div :class="{ 'date-container-m  date-container': mobile(), 'date-container': !mobile() }">
                <div class="date-year">{{convertDateToMonth(x.date)}}</div>
                <div class="date-day">{{getDay(x.date)}}</div>
                <div class="date-month">{{getYear(x.date)}}</div>
              </div>
              <div class="event-title-w">{{x.eventName}}</div>
              <div v-if= "isPastEvent(x.date)" class="details-button">Match over</div>
              <CountdownButton v-if= "!isPastEvent(x.date)" :initialSeconds=x.countDownTimerToMatchStart />
            </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { isMobile, getMonth } from '@/utils/helpers'
import Timer from '@/components/Common/Timer'
export default {
  name: 'MyMatchCard',
  components: {
    'CountdownButton': Timer
  },
  props: {
    value: {
      required: true
    }
  },
  mounted () {
    console.log(this.value)
  },
  updated () {
    console.log(this.value)
  },
  methods: {
    mobile () {
      return isMobile()
    },
    isPastEvent (date) {
      const inputDate = new Date(date)
      inputDate.setDate(inputDate.getDate() + 1)
      const currentDate = new Date()
      return inputDate < currentDate
    },
    convertDateToMonth (date) {
      return getMonth(date)
    },
    getYear (date) {
      return date.substring(0, 4)
    },
    getDay (date) {
      return date.substring(8, 10)
    },
    getPlayText (date) {
      return 'play in xx:xx'
    }
  }
}
</script>
<style scoped>
.date-container {
background: #ffffff;
    position: relative;
    top: -68px;
    width: 93px;
    padding: 9px 20px;
    border-radius: 10px;
    font-family: 'Poppins';
}
.date-container-m {
    width: 70% !important;
  }
.date-year {
position: relative;
    top: 7px;
    font-size: 14px;
    text-align: right;
}
.date-day {
    text-align: left;
    font-size: 36px;
    font-weight: 300;
    line-height: 1;
    top: -12px;
    position: relative;
}
.date-month {
    position: relative;
    top: -31px;
    font-size: 14px;
    font-family: 'Poppins';
    text-align: right;
}
.card-container {
    height: 100%;
    overflow: scroll;
    width: 100%;
    float: left;
    margin-left: 5%;
    align-items: center;
}
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  background-color: #262626;
}
.gallery-m .card-m {
    background-color: #000000;
    -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 20px 15px;
    border-radius: 10px;
}
.card {
}
.card img{
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
}
.img {
  max-width: 660px;
  height: auto;
}
.event-name {
  position: relative;
  top: -101px;
  font-size: 18px;
  margin-bottom: 0;
  font-weight: 500;
  text-align: left;
  padding: 24px 13px;
  background: #ffffff;
  font-family: Poppins;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.join{
  background: #0072fd;
  border-radius: 10px;
  position: relative;
  left: 30px;
  font-weight: 500;
  padding: 6px 18px;
  font-family: 'Roboto';
  color: #fff;
}
.details-line {
display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    top: -97px;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    /* margin-bottom: 10px; */
    background-color: #ffffff;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}
.event-title-w {
  position: relative;
  left: -80px;
  font-family: 'Poppins';
}
.timing {
  color: #ffffff;
}
.fixture-detail {
  cursor: pointer;
  padding: 15px 0;
  font-size: 21px;
  background: #fff;
  margin: 5px 0px;
  border-radius: 10px;
  font-weight: 900;
}
.details-button {
  background-color: #0072fd;
  font-family: Roboto;
  color: #fff;
  padding: 5px 12px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-right: 5%;
  text-transform: capitalize;
  line-height: 101%;
  border-radius: 10px;
}
@media (min-width:320px) and (max-width: 500px) {
  .img {
    max-width: 370px;
    height: auto;
  }
  .details-line {
    position: relative;
    top: -20px;
  }
}
</style>
