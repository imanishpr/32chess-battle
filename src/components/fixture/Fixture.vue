<template>
  <div class="main-cont">
    <div class="container-fixture" v-for="(categoryValueWithPool, category) in playerForFixture" :key="category">
      <div>{{headingsForEachFix(category)}}</div>
        <div class="container-fixture" v-for="(playerForFixtureArray, poolName) in categoryValueWithPool" :key="poolName">
        <div>{{headingsForEachPool(poolName)}}</div>
        <div class="tournament-bracket tournament-bracket--rounded">
          <div class="tournament-bracket__round" v-for="(roundWizePlayers, round) in playerForFixtureArray" :key="round" :class="{'tournament-bracket__round--quarterfinals' : round == 0, 'tournament-bracket__round--semifinals' : round == 1 }">
            <h3 class="tournament-bracket__round-title">Round-{{round}} / T-{{getRoundStartTime(round)}}</h3>
            <ul class="tournament-bracket__list" >
              <li class="tournament-bracket__item" v-for="(payers, pos) in roundWizePlayers" :key="pos">
                <div v-on:click="updateWinner(payers.matchId, 'category', 'poolName', 'round', 'pos', 'payers.user1.userName', 'payers.user2.userName')" class="tournament-bracket__match" tabindex="0" :class="{'myFix' : ((payers.user1 !== null && payers.user1.firstName  ==  currentUserName) || (payers.user2 !== null && payers.user2.firstName == currentUserName))} ">
                  <table class="tournament-bracket__table">
<!--                     <caption class="tournament-bracket__caption">
                      <time datetime="1998-02-18">Name : Rating</time>
                    </caption> -->
                    <thead class="sr-only">
                      <tr>
                        <th>Country</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody class="tournament-bracket__content">
                      <tr class="tournament-bracket__team tournament-bracket__team--winner">
                        <td class="tournament-bracket__country">
                          <abbr class="tournament-bracket__code" :class="{'winner' : (payers.winner !== null && payers.winner.firstName  !== null && payers.winner.userId == payers.user1.userId), 'looser' : (payers.winner !== null && payers.winner.firstName  !== null && payers.winner.userId != payers.user1.userId) }" v-if="payers.user1 != null && payers.user1.firstName != null" >{{payers.user1.firstName}} </abbr>
                          <abbr class="tournament-bracket__code" title="To be decided or its a bye" v-else-if="payers.user1 === null || payers.user1.firstName == null">--</abbr>
                          <span class="tournament-bracket__flag flag-icon flag-icon-ca" aria-label="Flag"></span>
                        </td>
<!--                         <td class="tournament-bracket__score">
                          <span class="tournament-bracket__number">4</span>
                        </td> -->
                      </tr>
                      <tr class="tournament-bracket__team">
                        <td class="tournament-bracket__country">
                          <abbr class="tournament-bracket__code" :class="{'winner' : (payers.winner !== null && payers.winner.firstName  !== null && payers.winner.userId == payers.user2.userId), 'looser' : (payers.winner !== null && payers.winner.firstName  !== null && payers.winner.userId != payers.user2.userId) }" v-if="payers.user2 !== null && payers.user2.firstName != null" v-on:click="updateWinner(payers.matchId, 'category', 'poolName', 'round', 'pos', 'payers.user2.userName', 'payers.user1.userName')">{{payers.user2.firstName}}</abbr>
                          <abbr class="tournament-bracket__code" title="To be decided or its a bye" v-else-if="payers.user2 === null || payers.user2.firstName == null">--</abbr>
                          <span class="tournament-bracket__flag flag-icon flag-icon-kz" aria-label="Flag"></span>
                        </td>
<!--                         <td class="tournament-bracket__score">
                          <span class="tournament-bracket__number">1</span>
                        </td> -->
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
            </ul>
          </div>
<!--           <div class="tournament-bracket__round tournament-bracket__round--semifinals">
            <h3 class="tournament-bracket__round-title">dadsadasd</h3>
            <ul class="tournament-bracket__list">
              <li class="tournament-bracket__item">
                <div class="tournament-bracket__match" tabindex="0">
                  <table class="tournament-bracket__table">
                    <caption class="tournament-bracket__caption">
                      <time datetime="1998-02-20">20 February 1998</time>
                    </caption>
                    <thead class="sr-only">
                      <tr>
                        <th>Country</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody class="tournament-bracket__content">
                      <tr class="tournament-bracket__team">
                        <td class="tournament-bracket__country">
                          <abbr class="tournament-bracket__code" title="Canada">CAN</abbr>
                          <span class="tournament-bracket__flag flag-icon flag-icon-ca" aria-label="Flag"></span>
                        </td>
                        <td class="tournament-bracket__score">
                          <span class="tournament-bracket__number">1</span>
                        </td>
                      </tr>
                      <tr class="tournament-bracket__team tournament-bracket__team--winner">
                        <td class="tournament-bracket__country">
                          <abbr class="tournament-bracket__code" title="Czech Republic">CZE</abbr>
                          <span class="tournament-bracket__flag flag-icon flag-icon-cz" aria-label="Flag"></span>
                        </td>
                        <td class="tournament-bracket__score">
                          <span class="tournament-bracket__number">2</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li class="tournament-bracket__item">
                  <div class="tournament-bracket__match" tabindex="0">
                    <table class="tournament-bracket__table">
                      <caption class="tournament-bracket__caption">
                        <time datetime="1998-02-20">20 February 1998</time>
                      </caption>
                      <thead class="sr-only">
                        <tr>
                          <th>Country</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody class="tournament-bracket__content">
                        <tr class="tournament-bracket__team">
                          <td class="tournament-bracket__country">
                            <abbr class="tournament-bracket__code" title="Finland">FIN</abbr>
                            <span class="tournament-bracket__flag flag-icon flag-icon-fi" aria-label="Flag"></span>
                          </td>
                          <td class="tournament-bracket__score">
                            <span class="tournament-bracket__number">4</span>
                          </td>
                        </tr>
                        <tr class="tournament-bracket__team tournament-bracket__team--winner">
                          <td class="tournament-bracket__country">
                            <abbr class="tournament-bracket__code" title="Russia">RUS</abbr>
                            <span class="tournament-bracket__flag flag-icon flag-icon-ru" aria-label="Flag"></span>
                          </td>
                          <td class="tournament-bracket__score">
                            <span class="tournament-bracket__number">7</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
                <li class="tournament-bracket__item">
                  <div class="tournament-bracket__match" tabindex="0">
                    <table class="tournament-bracket__table">
                      <caption class="tournament-bracket__caption">
                        <time datetime="1998-02-20">20 February 1998</time>
                      </caption>
                      <thead class="sr-only">
                        <tr>
                          <th>Country</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody class="tournament-bracket__content">
                        <tr class="tournament-bracket__team">
                          <td class="tournament-bracket__country">
                            <abbr class="tournament-bracket__code" title="Finland">FIN</abbr>
                            <span class="tournament-bracket__flag flag-icon flag-icon-fi" aria-label="Flag"></span>
                          </td>
                          <td class="tournament-bracket__score">
                            <span class="tournament-bracket__number">4</span>
                          </td>
                        </tr>
                        <tr class="tournament-bracket__team tournament-bracket__team--winner">
                          <td class="tournament-bracket__country">
                            <abbr class="tournament-bracket__code" title="Russia">RUS</abbr>
                            <span class="tournament-bracket__flag flag-icon flag-icon-ru" aria-label="Flag"></span>
                          </td>
                          <td class="tournament-bracket__score">
                            <span class="tournament-bracket__number">7</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
            </ul>
          </div>
          <div class="tournament-bracket__round tournament-bracket__round--bronze">
            <h3 class="tournament-bracket__round-title">Bronze medal game</h3>
            <ul class="tournament-bracket__list">
              <li class="tournament-bracket__item">
                <div class="tournament-bracket__match" tabindex="0">
                  <table class="tournament-bracket__table">
                    <caption class="tournament-bracket__caption">
                      <time datetime="1998-02-21">21 February 1998</time>
                    </caption>
                    <thead class="sr-only">
                      <tr>
                        <th>Country</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody class="tournament-bracket__content">
                      <tr class="tournament-bracket__team tournament-bracket__team--winner">
                        <td class="tournament-bracket__country">
                          <abbr class="tournament-bracket__code" title="Finland">FIN</abbr>
                          <span class="tournament-bracket__flag flag-icon flag-icon-fi" aria-label="Flag"></span>
                        </td>
                        <td class="tournament-bracket__score">
                          <span class="tournament-bracket__number">3</span>
                          <span class="tournament-bracket__medal tournament-bracket__medal--bronze fa fa-trophy" aria-label="Bronze medal"></span>
                        </td>
                      </tr>
                      <tr class="tournament-bracket__team">
                        <td class="tournament-bracket__country">
                          <abbr class="tournament-bracket__code" title="Canada">CAN</abbr>
                          <span class="tournament-bracket__flag flag-icon flag-icon-ca" aria-label="Flag"></span>
                        </td>
                        <td class="tournament-bracket__score">
                          <span class="tournament-bracket__number">2</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
            </ul>
          </div>
          <div class="tournament-bracket__round tournament-bracket__round--gold">
            <h3 class="tournament-bracket__round-title">Gold medal game</h3>
            <ul class="tournament-bracket__list">
              <li class="tournament-bracket__item">
                <div class="tournament-bracket__match" tabindex="0">
                  <table class="tournament-bracket__table">
                    <caption class="tournament-bracket__caption">
                      <time datetime="1998-02-22">22 February 1998</time>
                    </caption>
                    <thead class="sr-only">
                      <tr>
                        <th>Country</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody class="tournament-bracket__content">
                      <tr class="tournament-bracket__team tournament-bracket__team--winner">
                        <td class="tournament-bracket__country">
                          <abbr class="tournament-bracket__code" title="Czech Republic">CZE</abbr>
                          <span class="tournament-bracket__flag flag-icon flag-icon-cz" aria-label="Flag"></span>
                        </td>
                        <td class="tournament-bracket__score">
                          <span class="tournament-bracket__number">1</span>
                          <span class="tournament-bracket__medal tournament-bracket__medal--gold fa fa-trophy" aria-label="Gold medal"></span>
                        </td>
                      </tr>
                      <tr class="tournament-bracket__team">
                        <td class="tournament-bracket__country">
                          <abbr class="tournament-bracket__code" title="Russia">RUS</abbr>
                          <span class="tournament-bracket__flag flag-icon flag-icon-ru" aria-label="Flag"></span>
                        </td>
                        <td class="tournament-bracket__score">
                          <span class="tournament-bracket__number">0</span>
                          <span class="tournament-bracket__medal tournament-bracket__medal--silver fa fa-trophy" aria-label="Silver medal"></span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getFixtureByEventId } from '@/utils/functions'
// import { gameConfig } from '@/utils/helpers'
export default {
  name: 'Fixture',
  data () {
    return {
      playerForFixture: '',
      currentUserName: '',
      eventId: ''
    }
  },
  beforeMount () {
  },
  methods: {
    doSomethingElseFoeError (response) {
      if (response.data.code === 500 || response.data.response === null || response.data.response === undefined || (response.data.error !== undefined && response.data.error === 'NO-FIXTURE-FOUND')) {
        alert('Please login first and go to My Matches menu')
        this.$router.push({ name: 'Home' })
        return
      }
      this.playerForFixture = response.data.response.categoryWise
      this.currentUserName = response.data.response.accesseeUserName
      this.eventId = response.data.response.eventId
      this.startTime = response.data.response.startTime
      this.intervalInMins = response.data.response.intervalsInMins
      document.getElementById('overlay').style.display = 'none'
    },
    doSomethingElse (response) {
      if (response.data.response === null || response.data.response === undefined || (response.data.error !== undefined && response.data.error === 'NO-FIXTURE-FOUND')) {
        alert('Fixture will be available 1 hour(s) before the match starts')
        this.$router.push({ name: 'MyMatch' })
        return
      }
      this.playerForFixture = response.data.response.categoryWise
      this.currentUserName = response.data.response.accesseeUserName
      this.eventId = response.data.response.eventId
      this.startTime = response.data.response.startTime
      this.intervalInMins = response.data.response.intervalsInMins
      document.getElementById('overlay').style.display = 'none'
    },
    getRoundStartTime (round) {
      const firstTime = this.startTime.split(' - ')[0] // Extract the first time
      const firstSpaceIndex = firstTime.indexOf(' ')
      const amPm = firstTime.substring(firstSpaceIndex + 1).toUpperCase()
      const substringBeforeSpace = firstTime.substring(0, firstSpaceIndex)
      const [hourString, minuteString] = substringBeforeSpace.split(':')
      const hour = parseInt(hourString)
      const minute = parseInt(minuteString)
      // Calculate new minutes and hours
      const totalMinutes = minute + round * this.intervalInMins
      const newHour = (hour + Math.floor(totalMinutes / 60)) % 12
      const newMinute = totalMinutes % 60
      // Handle the case where newHour is 0
      const finalHour = newHour === 0 ? 12 : newHour
      // Determine new AM/PM
      const roundsIn12Hours = Math.floor((hour + Math.floor(totalMinutes / 60)) / 12)
      const isAm = amPm === 'AM'
      const newAmPm = (roundsIn12Hours % 2 === 0) ? amPm : (isAm ? 'PM' : 'AM')
      // Format minutes to ensure two digits
      const formattedMinute = newMinute < 10 ? `0${newMinute}` : newMinute
      const newTimeString = `${finalHour}:${formattedMinute} ${newAmPm}`
      return newTimeString
    },
    updateWinner (matchid, cat, pool, round, pos, winner, looser) {
      if (matchid !== undefined && matchid !== null) {
        this.$router.push({ path: `/mymatch/${matchid}` })
      } else {
        alert('Match will start soon.. come back later!!')
      }
      // const winnerObject = {}
      // winnerObject.eventId = this.eventId
      // winnerObject.catName = cat
      // winnerObject.poolName = pool
      // winnerObject.round = round
      // winnerObject.position = pos
      // winnerObject.winnerUserName = winner
      // winnerObject.looserUserName = looser
      // updateWinnerMethod('post', winnerObject, '')
      //   .then(response => (
      //     alert(response.data.response)
      //   ))
      //   .catch(err => { alert(err.toString()) })
    },
    headingsForEachFix (val) {
      return 'Open Tournament'
      // var finalHeading = ''
      // if (val.substring(0, 1) !== 7) {
      //   finalHeading += gameConfig[val.substring(0, 1)]
      // }
      // if (val.substring(1, 2) === 'U') {
      //   finalHeading += ' ' + 'Under - ' + val.substring(3)
      // }
      // return finalHeading
    },
    headingsForEachPool (poolName) {
      if (poolName === 'NO_POOL') {
        return 'Tentative fixture'
      }
      if (poolName === '-1Final') {
        return 'Cumulative Fixture of finalist from all pools'
      }
      return 'POOL - ' + poolName
    }
  },
  updated () {
  },
  mounted () {
    getFixtureByEventId('get', this.$route.params.id)
      .then(response => (this.doSomethingElse(response)))
      .catch(err => { this.doSomethingElseFoeError(err.response) })
    this.$forceUpdate()
  }
}
</script>
<style scoped>
/*!
 * Responsive Tournament Bracket
 * Copyright 2016 Jakub Hájek
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 */
@font-face {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 300;
  src: url(https://fonts.gstatic.com/s/worksans/v8/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32KxfXBiEJow.ttf) format('truetype');
}
@font-face {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/worksans/v8/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K0nXBiEJow.ttf) format('truetype');
}
@font-face {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  src: url(https://fonts.gstatic.com/s/worksans/v8/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K5fQBiEJow.ttf) format('truetype');
}
@font-face {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.gstatic.com/s/worksans/v8/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K67QBiEJow.ttf) format('truetype');
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  font-size: 15px;
}
@media (min-width: 38em) {
  html {
    font-size: 14px;
  }
}
@media (min-width: 52em) {
  html {
    font-size: 15px;
  }
}
@media (min-width: 72em) {
  html {
    font-size: 16px;
  }
}
body {
  background-color: #f1f1f1;
  font-family: 'Work Sans', 'Helvetica Neue', Arial, sans-serif;
}
.main-cont {
  width: 100%;
  background: #303030;
  overflow: scroll;
}
.container {
  width: 90%;
  min-width: 18em;
  margin: 20px auto;
}
h1,
h2 {
  text-align: center;
}
h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5em;
}
h2 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 2em;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.tournament-bracket {
  display: flex;
  flex-direction: column;
}
@media (min-width: 38em) {
  .tournament-bracket {
    flex-direction: row;
  }
}
.tournament-bracket__round {
  display: block;
  margin-left: -3px;
  flex: 1;
}
.tournament-bracket__round-title {
  color: #9e9e9e;
  font-size: 0.95rem;
  font-weight: 400;
  text-align: center;
  font-style: italic;
  margin-bottom: 0.5em;
}
.tournament-bracket__list {
  display: flex;
  flex-direction: column;
  flex-flow: row wrap;
  justify-content: center;
  height: 100%;
  min-height: 100%;
  border-bottom: 1px dashed #3D4849;
  padding-bottom: 2em;
  margin-bottom: 2em;
  transition: padding 0.2s ease-in-out, margin 0.2s ease-in-out;
}
@media (max-width: 24em) {
  .tournament-bracket__list {
    padding-bottom: 1em;
    margin-bottom: 1em;
  }
}
@media (min-width: 38em) {
  .tournament-bracket__list {
    margin-bottom: 0;
    padding-bottom: 0;
    border-right: 1px dashed #3D4849;
    border-bottom: 0;
  }
}
.tournament-bracket__round:last-child .tournament-bracket__list {
  border: 0;
}
.tournament-bracket__item {
  display: flex;
  flex: 0 1 auto;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 2% 0;
  width: 48%;
  transition: padding 0.2s linear;
}
.tournament-bracket__item:nth-child(odd) {
  margin-right: 2%;
}
.tournament-bracket__item:nth-child(even) {
  margin-left: 2%;
}
.tournament-bracket__item::after {
  transition: width 0.2s linear;
}
@media (max-width: 24em) {
  .tournament-bracket__item {
    width: 100%;
  }
  .tournament-bracket__item:nth-child(odd),
  .tournament-bracket__item:nth-child(even) {
    margin-left: 0;
    margin-right: 0;
  }
}
@media (min-width: 38em) {
  .tournament-bracket__item {
    padding: 0.5em 1em;
    width: 100%;
  }
  .tournament-bracket__item:nth-child(odd),
  .tournament-bracket__item:nth-child(even) {
    margin: 0;
  }
  .tournament-bracket__item::after {
    position: absolute;
    right: 0;
    content: '';
    display: block;
    width: 1em;
    height: 45%;
    border-right: 2px solid #9e9e9e;
  }
  .tournament-bracket__item:nth-child(odd)::after {
    top: 50%;
    border-top: 2px solid #9e9e9e;
    transform: translateY(-1px);
  }
  .tournament-bracket--rounded .tournament-bracket__item:nth-child(odd)::after {
    border-top-right-radius: 0.6em;
  }
  .tournament-bracket__item:nth-child(even)::after {
    bottom: 50%;
    border-bottom: 2px solid #9e9e9e;
    transform: translateY(1px);
  }
  .tournament-bracket--rounded .tournament-bracket__item:nth-child(even)::after {
    border-bottom-right-radius: 0.6em;
  }
  .tournament-bracket__round:first-child .tournament-bracket__item {
    padding-left: 0;
  }
  .tournament-bracket__round:last-child .tournament-bracket__item {
    padding-right: 0;
  }
  .tournament-bracket__round:last-child .tournament-bracket__item::after {
    display: none;
  }
  .tournament-bracket__round:nth-last-child(2) .tournament-bracket__item::after {

  }
}
@media (min-width: 72em) {
  .tournament-bracket__item {
    padding: 0.5em 1.5em;
  }
  .tournament-bracket__item::after {
    width: 1.5em;
  }
}
.tournament-bracket__match {
  display: flex;
  width: 100%;
  padding: 1em;
  border: 1px solid transparent;
  border-radius: 0.1em;
  outline: none;
  cursor: pointer;
  transition: padding 0.2s ease-in-out, border 0.2s linear;
  border-radius: 10px;
  box-shadow: 0px 1px 5px 1px #ffffff;
}
.tournament-bracket__match:focus {
  border-color: #2196F3;
}
.tournament-bracket__match::before,
.tournament-bracket__match::after {
  transition: all 0.2s linear;
}
@media (max-width: 24em) {
  .tournament-bracket__match {
    padding: 0.75em 0.5em;
  }
}
@media (min-width: 38em) {
  .tournament-bracket__match::before,
  .tournament-bracket__match::after {
    position: absolute;
    left: 0;
    z-index: 1;
    content: '';
    display: block;
    width: 1em;
    height: 10%;
    border-left: 2px solid #9e9e9e;
  }
  .tournament-bracket__match::before {
    bottom: 50%;
    border-bottom: 2px solid #9e9e9e;
    transform: translate(0, 1px);
  }
  .tournament-bracket--rounded .tournament-bracket__match::before {
    border-bottom-left-radius: 0.6em;
  }
  .tournament-bracket__match::after {
    top: 50%;
    border-top: 2px solid #9e9e9e;
    transform: translate(0, -1px);
  }
  .tournament-bracket--rounded .tournament-bracket__match::after {
    border-top-left-radius: 0.6em;
  }
}
@media (min-width: 72em) {
  .tournament-bracket__match::before,
  .tournament-bracket__match::after {
    width: 1.5em;
  }
  .tournament-bracket__match::before {
    transform: translate(0, 1px);
  }
  .tournament-bracket__match::after {
    transform: translate(0, -1px);
  }
}
.tournament-bracket__round:last-child .tournament-bracket__match::before,
.tournament-bracket__round:last-child .tournament-bracket__match::after {
}
.tournament-bracket__round:last-child .tournament-bracket__match::before {
  border-bottom-left-radius: 0.6em;
}
.tournament-bracket__round:last-child .tournament-bracket__match::after {
  border-left: 2px solid #9e9e9e;
}
.tournament-bracket__round:first-child .tournament-bracket__match::before,
.tournament-bracket__round:first-child .tournament-bracket__match::after {
  display: none;
}
.tournament-bracket__content {
  display: flex;
}
.tournament-bracket__content::after {
  content: 'v/s';
  width: 2em;
  text-align: center;
  padding: 0.2em 0.1em;
}
@media (min-width: 38em) {
  .tournament-bracket__content::after {
    order: 1;
  }
}
.tournament-bracket__content .tournament-bracket__team:first-child {
  width: 50%;
  order: 0;
  text-align: right;
}
@media (min-width: 38em) and (max-width: 52em) {
  .tournament-bracket__content .tournament-bracket__team:first-child {
    align-items: flex-end;
  }
}
.tournament-bracket__content .tournament-bracket__team:first-child .tournament-bracket__country {
  order: 2;
  justify-content: flex-end;
}
@media (min-width: 24em) {
  .tournament-bracket__content .tournament-bracket__team:first-child .tournament-bracket__country {
    order: 0;
  }
}
@media (min-width: 38em) and (max-width: 52em) {
  .tournament-bracket__content .tournament-bracket__team:first-child .tournament-bracket__country {
    flex-direction: column-reverse;
    align-items: flex-end;
  }
}
.tournament-bracket__content .tournament-bracket__team:first-child .tournament-bracket__score {
  order: 0;
}
@media (min-width: 24em) {
  .tournament-bracket__content .tournament-bracket__team:first-child .tournament-bracket__score {
    order: 2;
  }
}
.tournament-bracket__content .tournament-bracket__team:last-child {
  width: 50%;
  order: 2;
  text-align: left;
}
@media (min-width: 38em) and (max-width: 52em) {
  .tournament-bracket__content .tournament-bracket__team:last-child {
    align-items: flex-start;
  }
}
@media (min-width: 38em) {
  .tournament-bracket__content .tournament-bracket__team:last-child .tournament-bracket__country {
    justify-content: flex-start;
  }
}
@media (min-width: 38em) and (max-width: 52em) {
  .tournament-bracket__content .tournament-bracket__team:last-child .tournament-bracket__country {
    align-items: flex-start;
  }
}
.tournament-bracket__content .tournament-bracket__team:last-child .tournament-bracket__code {
  order: 1;
}
.tournament-bracket__table {
  width: 100%;
}
.tournament-bracket__caption {
  font-size: 0.8rem;
  color: #BDBDBD;
  font-weight: 300;
  padding-bottom: 0.75em;
}
.tournament-bracket__team {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
@media (min-width: 24em) {
  .tournament-bracket__team {
    flex-direction: column-reverse;
  }
}
@media (min-width: 38em) {
  .tournament-bracket__team {
    flex-direction: column-reverse;
  }
}
.tournament-bracket__country {
  font-size: 0.95rem;
  display: flex;
  margin-top: 0.5em;
  align-items: center;
}
@media (max-width: 24em) {
  .tournament-bracket__country {
    margin-top: 0;
  }
}
@media (min-width: 38em) and (max-width: 52em) {
  .tournament-bracket__country {
    display: flex;
    flex-direction: column;
  }
  .tournament-bracket__country .tournament-bracket__code {
    margin-top: 0.2em;
  }
}
.tournament-bracket__code {
  padding: 0 0.5em;
  color: #fffff;
  font-weight: 600;
  text-transform: uppercase;
  border: 0;
  text-decoration: none;
  cursor: help;
  transition: padding 0.2s ease-in-out;
}
@media (max-width: 24em) {
  .tournament-bracket__code {
    padding: 0 0.25em;
  }
}
@media (min-width: 38em) and (max-width: 52em) {
  .tournament-bracket__code {
    padding: 0;
  }
}
.tournament-bracket__score {
  display: flex;
  align-items: center;
}
.tournament-bracket__team:first-child .tournament-bracket__score {
  flex-direction: row-reverse;
  padding-left: 0.75em;
}
.tournament-bracket__team:last-child .tournament-bracket__score {
  padding-right: 0.75em;
}
.tournament-bracket__number {
  display: inline-block;
  padding: 0.2em 0.4em 0.2em;
  border-bottom: 0.075em solid transparent;
  font-size: 0.95rem;
  background-color: #F5F5F5;
  border-color: #dddddd;
}
.tournament-bracket__team--winner .tournament-bracket__number {
  background-color: #FFF176;
  border-color: #fad674;
}
.tournament-bracket__medal {
  padding: 0 0.5em;
}
.tournament-bracket__medal--gold {
  color: #FFD700;
}
.tournament-bracket__medal--silver {
  color: #C0C0C0;
}
.tournament-bracket__medal--bronze {
  color: #CD7F32;
}
.tournament-bracket__list {
  padding-left: 0px !important;
}
.winner {
    background: #00bfff;
    border-radius: 5px;
}
.looser {
    background: #ff355e;
    border-radius: 5px;
}
.myFix {
  background: black;
  border-radius: 10px;
  box-shadow: 0px 1px 5px 1px #f4f4f4;
  color: #ffffff;
}
.main-cont{
  color: #ffffff;
  background: #3d4849;
}
.container-fixture {
  width: 90%;
  min-width: 18em;
  margin: 20px auto;
  height: 100vh
}
</style>
