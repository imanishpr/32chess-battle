<template>
  <div class="hello">
    <div v-if="mobile()"> Hi</div>
    <div v-else>
      Now you don't
    </div>
    <h1>{{ msg }}</h1>
    <img v-if='showCard ===undefined' class="event-desc-Img" :src="img" alt="EventImage" />
    <div className={styles.imgFilter} />
    <v-eventCard v-model=showCard></v-eventCard>
  </div>
</template>

<script>
import { getCookie, getEvents } from '@/utils/functions'
import { isMobile } from '@/utils/helpers'
import EventCard from '@/components/EventCard/EventCard'
import LogIn from '@/components/login/Login'
export default {
  name: 'HelloWorld',
  components: {
    'v-eventCard': EventCard,
    'v-Login': LogIn
  },
  data () {
    return {
      LoggedInHome: false,
      error: undefined,
      msg: 'Participate to play',
      showCard: undefined,
      img: '../../assets/logo.png" '
    }
  },
  updated () {
    if (getCookie('loggedIn')) {
      this.LoggedInHome = true
    }
    this.$store.commit('saveEventList', this.showCard)
    console.log(this.showCard)
    console.log(this.$store.state.eventList)
  },
  beforeMount () {
    console.log(this.$store.state.eventList)
    if (getCookie('loggedIn')) {
      this.LoggedInHome = true
    }
  },
  mounted () {
    getEvents('get', '', '').then(response => (this.showCard = response.data.response)).catch(err => { this.error = err.response })
    if (getCookie('loggedIn')) {
      this.LoggedInHome = true
    }
  },

  methods: {
    mobile () {
      return isMobile()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none !important;
}
.hello {
  margin: 7% 0;
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
@media (min-width:320px) and (max-width: 500px) {
  h1[data-v-469af010], h2[data-v-469af010] {
    font-weight: 800;
    color: #000000;
    margin: 25% 0 0 0;
  }
}
</style>
