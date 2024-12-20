<template>
  <div class="container">
    <div :class="{ 'sidebar m-left-panel': mobile(), 'left-panel': !mobile() }" id="m-left-panel">
      <v-LPanel></v-LPanel>
    </div>
    <div class="right-wide-panel-main-chess-m">
      <v-TopStrip />
      <div class="online-chess-board-container-m  ">
                  <div class="chess-board-info-top">
            <div class="scrollable-div">
              <div class="content">{{ pgn }}</div>
            </div>
            <div class="opponent-b-m">
              <div id="oppo-user" class="user-b-m"></div>
              <div class="timer-opposite-m user-b-timer-m"> {{time2}} </div>
            </div>
          </div>
        <div class="chess-board-m">
        <v-chess v-bind:timers="gameOver" @newdata="handleData($event)" @loadPage="removeOverLay($event)"></v-chess>
        </div>
        <div class="chess-board-info-bottom">
           <div id="closure"></div>
          <div class="opponent-a">
            <div id="user" class="user-a-m"></div>
            <div class="timer user-a-timer-m"> {{time}} </div>
          </div>
          <div class="pgn-mobile">{{ pgn }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChessboardExtension from '@/components/Chess/ChessboardExtension'
import TopStripeMobile from '@/components/Common/TopStripeMobile'
import 'vue-chessboard/dist/vue-chessboard.css'
import LeftPanel from '@/components/Common/LeftPanel'
import { getCookie } from '@/utils/functions'
import { isMobile } from '@/utils/helpers'
export default {
  name: 'MainChessBoardMobile',
  components: {
    'v-chess': ChessboardExtension,
    'v-LPanel': LeftPanel,
    'v-TopStrip': TopStripeMobile
  },
  data () {
    return {
      username: ':)',
      message: 'Let the countdown begin!!',
      message2: 'Let the countdown begin!!',
      totalTime: 3 * 60 * 1000,
      timerRunning: false,
      timerPaused: false,
      totalTime2: 3 * 60 * 1000,
      timerRunning2: false,
      timerPaused2: false,
      interval: null,
      interval2: null,
      sample: '',
      pgn: '',
      intervalCounterToCheck: 100,
      decrementPerIntervalCounter: 105
    }
  },
  computed: {
    gameOver: {
      get: function () {
        return (this.totalTime <= this.intervalCounterToCheck) || (this.totalTime2 <= this.intervalCounterToCheck)
      }
    },
    time: {
      get: function () {
        if ((isNaN(this.seconds) || this.seconds === 0 || this.seconds === '00') && (isNaN(this.minutes) || this.minutes === 0 || this.minutes === '00') && this.milliSeconds > 0) {
          return this.seconds + ' : ' + this.milliSeconds
        } else {
          return this.minutes + ' : ' + this.seconds
        }
      }
    },
    minutes: {
      get: function () {
        var min = Math.floor(this.totalTime / 60000)
        if (isNaN(min) || min < 0) {
          return '00'
        }
        return min >= 10 ? min : '0' + min
      }
    },
    seconds: {
      get: function () {
        var sec = Math.floor((this.totalTime % 60000) / 1000)
        sec = (sec >= 10 ? sec : '0' + sec)
        if (isNaN(sec) || sec < 0) {
          return '00'
        }
        return sec
      }
    },
    milliSeconds: {
      get: function () {
        var milli = Math.floor(this.totalTime % 1000) // Get milliseconds
        milli = Math.floor(milli / 10) // Trim to two digits
        if (isNaN(milli) || milli < 10) {
          return '00'
        }
        return milli >= 10 ? milli : '0' + milli // Ensure it's always two digits
      }
    },
    time2: {
      get: function () {
        if ((isNaN(this.seconds2) || this.seconds2 === 0 || this.seconds2 === '00') && (isNaN(this.minutes2) || this.minutes2 === 0 || this.minutes2 === '00') && this.milliSeconds2 > 0) {
          return this.seconds2 + ' : ' + this.milliSeconds2
        } else {
          return this.minutes2 + ' : ' + this.seconds2
        }
      }
    },
    minutes2: {
      get: function () {
        var min = Math.floor(this.totalTime2 / 60000)
        if (isNaN(min) || min < 0) {
          return '00'
        }
        return min >= 10 ? min : '0' + min
      }
    },
    seconds2: {
      get: function () {
        var sec = Math.floor((this.totalTime2 % 60000) / 1000)
        sec = (sec >= 10 ? sec : '0' + sec)
        if (isNaN(sec) || sec < 0) {
          return '00'
        }
        return sec
      }
    },
    milliSeconds2: {
      get: function () {
        var milli = Math.floor(this.totalTime2 % 1000) // Get milliseconds
        milli = Math.floor(milli / 10) // Trim to two digits
        if (isNaN(milli) || milli < 10) {
          return '00'
        }
        return milli >= 10 ? milli : '0' + milli // Ensure it's always two digits
      }
    }
  },
  methods: {
    mobile () {
      return isMobile()
    },
    removeOverLay ($datae) {
      document.getElementById('overlay').style.display = 'none'
      this.pgn = $datae[1]
      this.username = getCookie('username')
    },
    handleData ($data) {
      if ($data[5] !== null && $data[5] !== undefined) {
        if ($data[5] === this.username) {
          this.totalTime = Math.ceil($data[6])
          this.totalTime2 = Math.ceil($data[7])
        } else {
          this.totalTime = Math.ceil($data[7])
          this.totalTime2 = Math.ceil($data[6])
        }
      }
      this.timerRunning = $data[1]
      if (this.timerRunning === true) {
        this.timerRunning2 = false
      } else {
        if ($data[4] !== undefined) {
          this.timerRunning2 = $data[4]
        } else {
          this.timerRunning2 = true
        }
      }
    },
    timerRun () {
      this.message = 'Greatness is within sight!!!'
      this.interval = setInterval(this.countdownTimer, this.intervalCounterToCheck)
    },
    timerRun2 () {
      this.message2 = 'Greatness is within sight!!!'
      this.interval2 = setInterval(this.countdownTimer2, this.intervalCounterToCheck)
    },
    timerPause () {
      this.message = 'Never quit, keep going!!'
      this.timerRunning = false
      clearInterval(this.interval)
    },
    timerPause2 () {
      this.message2 = 'Never quit, keep going!!'
      this.timerRunning2 = false
      clearInterval(this.interval2)
    },
    countdownTimer () {
      if (this.timerRunning === true) {
        if (this.totalTime >= this.intervalCounterToCheck) {
          this.totalTime -= this.decrementPerIntervalCounter
        }
        if (this.totalTime <= this.intervalCounterToCheck) {
          this.timerRunning = false
          this.timerRunning2 = false
        }
        // check for checkmate & zero time for one of player
        // this.timerRunning2 = false
      }
      if (this.timerRunning2 === true) {
        if (this.totalTime2 >= this.intervalCounterToCheck) {
          this.totalTime2 -= this.decrementPerIntervalCounter
        }
        if (this.totalTime2 <= this.intervalCounterToCheck) {
          this.timerRunning = false
          this.timerRunning2 = false
        }
        // check for checkmate & zero time for one of player
        // this.timerRunning = false
      }
    }
  },
  mounted () {
    this.timerRun()
    this.username = getCookie('username')
  }
}
</script>
<style type="text/css">
body {
  margin: 0;
  padding: 0;
  background-color: #000000;
}

.right-wide-panel-main-chess-m{
  -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    overflow: auto;
    padding: 0px 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    background: #262626;
}
@media (min-width:320px) and (max-width: 500px) {
  .right-wide-panel-main-chess-m .cg-board-wrap {
  width: 370px !important;
  height: 370px !important;
  display: block;
}

.chess-board-m {
  width: 370px;
  background-color: #ddd;
  -webkit-box-sizing: border-box;
  float: left;
  height: 700px;
  background-color: #000000;
  height: 370px;
  margin: 5% 0%;
}
.chess-board:last-child {
  width: 400px;
  background-color: #3E3E3E;
  border-radius: 5px;

}
.ranks {
  right: 0px !important;
}
.online-chess-board-container-m {
  width: 100%;
}

.timer-opposite-m, .user-a-timer-m, .user-b-timer-m {
  background: #5AC628;
  color: #fff;
  float: left;
  font-weight: 500;
  font-family: 'Roboto';
  float: left;
  width: 50%;
  -webkit-box-sizing: border-box;
  font-size: 51px;
  padding: 1px 10px;
}
.hidden{
  display: none;
}
.dot {
  height: 25px;
  width: 25px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
}
.pgn{
    font-family: 'Roboto';
    height: 390px;
    width: 87%;
    text-align: left;
    padding: 20px;
    float: left;
    margin: 5px;
    color: #fff;
    border-radius: 10px;
    font-size: 16px;
    background: #262626;
}
#closure {
  width: 98%;
  font-size: 17px;
  text-align: left;
  margin-left: 5px;
  float: left;
  padding: 5px;
  color: #fd5c63;
  font-family: 'Roboto';
  font-weight: 900;
  border-radius: 5px;
  font-weight: 900;
}
.pgn-mobile {
  display: none;
}
.opponent-details-board-page {
    width: 35%;
    float: left;
    background: #3E3E3E;
}
.opponent-details-board-page .opponent-b-m {
  width: 100%;
  overflow: hidden;
}
.opponent-details-board-page .opponent-a {
  width: 100%;
  overflow: hidden;
}
.scrollable-div {
  background-color: #262626;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  padding: 1% 2%;
  border-radius: 5px;
}

.content {
    display: inline-block;
    color: #ffffff;
}
.user-b-m, .user-a-m {
float: left;
    width: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /* border: 1px solid #ccc; */
    /* padding: 20px; */
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    padding: 4% 5%;
}
#oppo-user, #user {
    width: 50%
}
.cg-board-wrap coords.files {
    color: #fff;
}
}

</style>
