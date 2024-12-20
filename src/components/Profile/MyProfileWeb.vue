<template>
  <div class="container">
    <div :class="{ 'sidebar m-left-panel': mobile(), 'left-panel': !mobile() }" id="m-left-panel">
      <v-LPanel></v-LPanel>
    </div>
    <div class="right-wide-panel-pay">
      <v-TopStrip/>
      <div class="profile-container">
        <div>
            <div class="rank-container">
                <div class="rank"><i class="iconsax" icon-name="ranking"></i>#{{ myInfo.rank }}</div>
            </div>
            <div class="top-section">
                <img src="https://res.cloudinary.com/parc-india/image/upload/e_improve:outdoor/c_scale,w_150/Screen_Shot_2022-01-16_at_9.44.45_PM_hgazpj.jpg" alt="Profile Picture" class="profile-pic">
                <div class="info-section">
                    <div class="username">{{ myInfo.userName }}</div>
                    <div class="username">{{ myInfo.firstName }}</div>
                    <div class="username">{{ myInfo.email }}</div>
                    <!-- <div class="email">{{ myInfo.email }}</div> -->
                    <div class="username">{{ myInfo.contactNumber }}</div>
                </div>
            </div>
            <br>
             <br>
              <br>
            <div class="circle-container">
                <div class="circle" :style="{'--win-percent': myInfo.winPercent, '--lost-percent': myInfo.lostPercent }">
                    <div class="circle-text">{{ myInfo.winPercent }}%</div>
                </div>
            </div>

            <div class="stats-container">
                <div class="stat">
                    <h4>Wins</h4>
                    <p>{{myInfo.win}}</p>
                </div>
                <div class="stat">
                    <h4>Lost</h4>
                    <p>{{myInfo.lost}}</p>
                </div>
                <div class="stat">
                    <h4>Draws</h4>
                    <p>{{myInfo.draw}}</p>
                </div>
            </div>

            <div class="total-games">
                <h4>Total Game(s) Played: <span>{{myInfo.totalGame}}</span></h4>
            </div>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
import { setCookie, getCookie, isLogged } from '@/utils/functions'
import { getMyInfo, createTeams, searchUser, invitePlayer } from '@/utils/profile'
import LeftPanel from '@/components/Common/LeftPanel'
import TopStripe from '@/components/Common/TopStripe'
import { isMobile } from '@/utils/helpers'
export default {
  name: 'MyProfile',
  components: {
    'v-LPanel': LeftPanel,
    'v-TopStrip': TopStripe
  },
  computed: {
    bool: {
      get: function () {
        return (this.responseData.data === undefined || getCookie('loggedIn') === true)
      }
    }
  },
  watch: {
    searchedUserData () {
      let x = document.getElementsByClassName('sp-email')
      console.log(x)
      if (x !== undefined && x[0] !== undefined && this.searchedUserData !== null) {
        x[0].innerHTML = this.searchedUserData.email
      }
      x = document.getElementsByClassName('sp-username')
      console.log(x)
      if (x !== undefined && x[0] !== undefined && this.searchedUserData !== null) {
        x[0].innerHTML = this.searchedUserData.userName
      }
      x = document.getElementsByClassName('user-id')
      console.log(x)
      if (x !== undefined && x[0] !== undefined && this.searchedUserData !== null) {
        x[0].innerHTML = this.searchedUserData.userIdL
      }
      console.log('The counter has changed!')
    }
  },
  updated () {
    if (!this.bool) {
      console.log(this.responseData)
      setCookie('loggedIn', true)
      setCookie('auth', this.responseData.data.response, 10)
      // this.$router.push({ name: 'HelloWorld' })
    }
    console.log('mounted')
  },
  beforeMount () {
    if (isLogged() === false) {
      this.$router.push({ name: 'Home' })
    }
  },
  mounted () {
    document.getElementById('overlay').style.display = 'block'
    getMyInfo('get', '', '').then(response => (this.doSomethingElse(response.data.response))).catch(err => { this.error = err.response })
  },
  data () {
    return {
      input: {
        username: '',
        password: '',
        gameId: '',
        teamname: '',
        susername: ''
      },
      winPercent: 80,
      lostPercent: 10,
      teamId: '',
      userId: '',
      searchedUserData: '',
      inviteCompleted: '',
      myTeamData: '',
      myInfo: '',
      responseData: '',
      selected: 'Badminton',
      img: 'https://res.cloudinary.com/parc-india/image/upload/v1642349740/Screen_Shot_2022-01-16_at_9.44.45_PM_hgazpj.png',
      options: [
        { text: 'Badminton', value: 11 },
        { text: 'Cricket', value: 22 },
        { text: 'basketBall', value: 33 }
      ]
    }
  },
  methods: {
    doSomethingElse (data) {
      this.myInfo = data
      document.getElementById('overlay').style.display = 'none'
    },
    mobile () {
      return isMobile()
    },
    handleClick (e) {
      if (e.target.matches('.sp-add')) {
        if (document.getElementsByClassName('user-id') !== null && document.getElementsByClassName('user-id') !== undefined) {
          this.userId = document.getElementsByClassName('user-id')[0].innerHTML
        } else {
          return
        }
        let data = {
          'teamId': Number(this.teamId),
          'inviteeUserId': Number(this.userId)
        }
        invitePlayer('post', data, '').then(response => (this.inviteCompleted = response.data.responseData))
        console.log('Got a click on .play-video or a child element')
      }
    },
    searchUserInfo (e) {
      console.log(this.input.suserName)
      if (this.input.suserName !== '') {
        this.teamId = e.target.parentElement.children[1].innerHTML
        let data = this.input.suserName
        searchUser('get', data, '').then(response => (this.searchedUserData = response.data.response))
        e.target.parentElement.children[4].classList.remove('hide')
        document.querySelectorAll('.sp-email').forEach(e => e.remove())
        document.querySelectorAll('.user-id').forEach(e => e.remove())
        document.querySelectorAll('.sp-add').forEach(e => e.remove())
        document.querySelectorAll('.sp-username').forEach(e => e.remove())
        let div = document.createElement('div')
        div.classList.add('sp-email')
        let div2 = document.createElement('div')
        div2.classList.add('sp-username')
        let div3 = document.createElement('div')
        div3.classList.add('user-id')
        let button = document.createElement('button')
        button.classList.add('sp-add')
        button.textContent = 'Invite'
        button.addEventListener('click', this.handleClick)
        e.target.parentElement.appendChild(div)
        e.target.parentElement.appendChild(div3)
        e.target.parentElement.appendChild(div2)
        e.target.parentElement.appendChild(button)
      }
    },
    createTeam () {
      if (this.input.teamname !== '' && this.gameId !== '') {
        let data = {
          'teamName': this.input.teamname,
          'gameId': this.input.gameId
        }
        createTeams('post', data, '').then(response => (this.myTeamData = response.data.responseData))
        if (this.responseData !== undefined && this.responseData.code === 200) {
          this.bool = false
        }
        // console.log(message('max'))
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  type="text/css">
html, body {
  background: #000;
}
h1, h2 {
  font-weight: normal;
}

  .profile-container {
            background-color: #444;
            border-radius: 12px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            padding: 20px;
            max-width: 800px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .top-section {
            display: flex;
            align-items: center;
            gap: 20px;
            text-align: justify;
        }

        .profile-pic {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            object-fit: cover;
        }

        .info-section {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .username {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #fff;
        }

        .fullname {
            font-size: 24px;
            color: #ccc;
            margin-bottom: 15px;
        }

        .rank-container {
            gap: 10px;
            color: #fff;
        }

        .rank {
            font-size: 100px;
            font-weight: bold;
            color: #fff;
        }
        .rank .iconsax {
          font-size: 100px;
          margin-right: 10px;
        }

        .circle-container {
            position: relative;
            width: 250px;
            height: 250px;
            margin: 0 auto;
        }

        .circle {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: conic-gradient(
                #4caf50 0% calc(var(--win-percent) * 1%),
                #f44336 calc(var(--win-percent) * 1%) calc((var(--win-percent) + var(--lost-percent)) * 1%),
                #ffc107 calc((var(--win-percent) + var(--lost-percent)) * 1%) 100%
            );
            position: relative;
        }

        .circle-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 32px;
            font-weight: bold;
            color: #fff;
        }

        .stats-container {
            display: flex;
            justify-content: space-around;
            margin-bottom: 20px;
        }

        .stat {
            flex: 1;
            text-align: center;
            padding: 10px;
        }

        .stat h4 {
            margin: 0;
            font-size: 20px;
            color: #f4f4f4;
        }

        .stat p {
            margin: 5px 0 0;
            font-size: 18px;
            font-weight: bold;
            color: #fff;
        }

        .total-games {
            text-align: center;
        }

        .total-games h4 {
            font-size: 22px;
            font-weight: bold;
            color: #fff;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .profile-container {
                padding: 10px;
            }

            .top-section {
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }

            .info-section {
                align-items: center;
            }

            .circle-container {
                width: 200px;
                height: 200px;
            }

            .circle-text {
                font-size: 24px;
            }

            .stat h4 {
                font-size: 18px;
            }

            .stat p {
                font-size: 16px;
            }

            .total-games h4 {
                font-size: 20px;
            }
        }
</style>
