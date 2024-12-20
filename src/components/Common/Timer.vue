<template>
  <div class="timer-cont">
    <button class="details-button" :disabled="countdownActive">{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    initialSeconds: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      secondsRemaining: this.initialSeconds,
      countdownActive: false,
      refresh: this.secondsRemaining > 0
    }
  },
  computed: {
    buttonText () {
      console.log(this.secondsRemaining / 60)
      console.log((this.secondsRemaining / 60) < -300)
      if ((this.secondsRemaining / 60) < -300) {
        console.log('yeyey')
        return 'Played already'
      }
      if ((this.secondsRemaining / 60) > 99) {
        const days = (this.secondsRemaining / 60) / 1440
        if (days < 1) {
          return 'Match starts today'
        }
      }
      console.log(this.secondsRemaining)
      if (this.countdownActive) {
        const minutes = Math.floor(this.secondsRemaining / 60)
        console.log(minutes)
        if (minutes < -300) {
          return 'Played already'
        }
        if (minutes > 99) {
          const days = minutes / 1440
          if (days < 1) {
            return 'Match starts today'
          }
        }
        const seconds = this.secondsRemaining % 60
        return `Match starts in ${this.pad(minutes)}:${this.pad(seconds)}`
      } else {
        return this.secondsRemaining <= 0 ? 'Play now' : 'Match will start soon'
      }
    }
  },
  methods: {
    pad (value) {
      return value < 10 ? `0${value}` : value
    },
    startCountdown () {
      const minutes = Math.floor(this.secondsRemaining / 60)
      console.log(minutes)
      if (minutes > 99 || minutes < -300) {
        return
      }

      if (!this.countdownActive) {
        this.countdownActive = true

        const countdownInterval = setInterval(() => {
          if (this.secondsRemaining > 0) {
            this.secondsRemaining--
          } else {
            this.countdownActive = false
            if (this.refresh) {
              this.refresh = false
              window.location.reload()
            }
            clearInterval(countdownInterval)
          }
        }, 1000)
      }
    }
  },
  mounted () {
    // Start the countdown when the component is mounted
    this.startCountdown()
  }
}
</script>
<style type="text/css" scoped>
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
.timer-cont {
  width: 40%;
}
</style>
