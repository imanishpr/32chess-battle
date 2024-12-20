<script>
import { chessboard } from 'vue-chessboard'
import io from 'socket.io-client'
import { getCookie } from '@/utils/functions'
import { getCurrentMatch } from '@/utils/matchHelper'
let dragColor = null
let status = null
export default {
  name: 'ChessboardExtension',
  extends: chessboard,
  props: {
    timers: {
      type: Boolean
    }
  },
  data () {
    return {
      checkGameStatus: this.$props.timers,
      socket: {},
      loaded: false,
      context: {},
      matchStart: false,
      matchData: undefined,
      myUserName: '',
      oppoUserName: '',
      initialPosition: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      socketIOData: {
        auth: getCookie('auth'),
        fen: '',
        prevFen: '',
        pgn: '',
        matchId: '',
        eventId: '',
        challengeId: '',
        source: '',
        target: '',
        gameOver: false
      }
    }
  },
  watch: {
    timers: function (val) {
      if (this.$props.timers) {
        this.socketIOData.gameOver = true
        this.socket.emit('move', this.socketIOData)
        this.board.set({
          fen: this.game.fen(),
          movable: {
            dests: {}
          }
        })
        let turn = this.game.fen().charAt(this.game.fen().indexOf(' ') + 1)
        if (turn === 'b') {
          document.getElementById('closure').innerHTML = 'Black lost the game due to time'
          console.log('Black lost the game due to time')
        } else {
          document.getElementById('closure').innerHTML = 'White lost the game due to time'
          console.log('white lost the game due to time')
        }
      }
    }
  },
  methods: {
    doSomethingElseFoeError (response) {
      console.log(response)
      if (response.data.code === 500 || response.data.response === null || response.data.response === undefined) {
        alert('Please login first and go to My Matches menu')
      }
      document.getElementById('overlay').style.display = 'none'
    },
    userPlay () {
      return (orig, dest) => {
        this.socketIOData.prevFen = this.game.fen()
        this.socketIOData.source = orig
        this.socketIOData.target = dest
        if (this.isPromotion(orig, dest)) {
          this.promoteTo = this.onPromotion()
        }
        this.game.move({from: orig, to: dest, promotion: this.promoteTo}) // promote to queen for simplicity
        this.board.set({
          fen: this.game.fen()
        })
        this.calculatePromotions()
        this.socketIOData.fen = this.game.fen()
        this.socketIOData.pgn = this.game.pgn()
        this.socketIOData.matchId = this.$route.params.id
        this.$emit('loadPage', ['loaded', this.game.pgn()])
        this.socket.emit('move', this.socketIOData)
        let tFen = this.game.fen()
        let turn = tFen.charAt(tFen.indexOf(' ') + 1)
        if (turn === 'b') {
          dragColor = 'black'
        } else {
          dragColor = 'white'
        }
        let moveColor = dragColor
        if (this.game.in_checkmate()) {
          status = 'Game over, ' + moveColor + ' is in checkmate.'
          this.setMessage(status)
          this.$emit('newdata', [this.matchData.color, false, 1, 1, false])
        } else if (this.game.in_draw()) {
          status = 'Game over, drawn position'
          this.$emit('newdata', [this.matchData.color, false, 1, 1, false])
        } else {
          status = moveColor + ' to move'
          this.$emit('newdata', ['timer', false, 1, 1, true])
          this.setMessage(status)
        }
        this.setMessage(status)
      }
    },
    matchWillStartSoon () {
      this.board.set({
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        movable: {
          dests: {}
        }
      })
      document.getElementById('closure').innerHTML = 'Game will be open soon'
      this.$emit('loadPage', ['loaded', ''])
    },
    setMessage (status) {
      document.getElementById('closure').innerHTML = status
    },
    setTwoUsers (matchData) {
      if (matchData.color === 'white') {
        this.myUserName = this.matchData.userName1
        this.oppoUserName = this.matchData.userName2
      } else {
        this.oppoUserName = this.matchData.userName1
        this.myUserName = this.matchData.userName2
      }
      document.getElementById('user').innerHTML = 'Player : ' + this.myUserName
      document.getElementById('oppo-user').innerHTML = 'Player : ' + this.oppoUserName
    }
  },
  created () {
    this.socket = io('http://ec2-13-232-115-23.ap-south-1.compute.amazonaws.com:3000', { transports: ['websocket'] })
  },
  update () {
    this.$store.commit('loadBoard', true)
  },
  mounted () {
    setInterval(() => {
      this.matchStart = false
      if (this.socket.readyState !== this.socket.OPEN) {
        console.log('reloading , no sockets')
        window.location.reload()
      }
    }, 180000)
    if (!this.matchStart) {
      getCurrentMatch('get', this.$route.params.id, '').then(response => {
        this.$emit('loadPage', ['loaded', ''])
        this.loaded = true
        this.matchStart = true
        this.matchData = response.data.response.match
        if (this.matchData === null || this.matchData === undefined || this.matchData.status !== 'STARTED') {
          this.matchWillStartSoon()
          return
        }
        this.setTwoUsers(this.matchData)
        let lastMove = response.data.response.move
        if (lastMove != null && lastMove !== undefined) {
          if (lastMove.status === 'DONE' || lastMove.status === 'CONCLUDED' || lastMove.status === 'DRAW') {
            this.game.load_pgn(lastMove.pgn)
            this.$emit('loadPage', ['loaded', lastMove.pgn])
            let moveColor
            let tFen = lastMove.fen
            let turn = tFen.charAt(tFen.indexOf(' ') + 1)
            if (turn === 'b') {
              moveColor = 'black'
            } else {
              moveColor = 'white'
            }
            this.board.set({
              fen: this.game.fen(),
              turnColor: dragColor,
              orientation: this.matchData.color,
              movable: {
                dests: {}
              }
            })
            if (this.myUserName === lastMove.userName1) {
              this.$emit('newdata', ['timer', false, 1, 1, false, this.myUserName, lastMove.minuteLeft, lastMove.minuteLeft2])
            } else {
              this.$emit('newdata', ['timer', false, 1, 1, false, this.oppoUserName, lastMove.minuteLeft2, lastMove.minuteLeft])
            }
            // this.$emit('newdata', [this.matchData.color, false, lastMove.minuteLeft, lastMove.minuteLeft2, false])
            status = 'Game over, ' + moveColor + ' lost the game'
            if (lastMove.status === 'DRAW') {
              if (lastMove.minuteLeft < lastMove.minuteLeft2) {
                status = 'Drawn game, winner will updated in fixture as per rules'
              } else {
                status = 'Drawn game, winner will updated in fixture as per rules'
              }
              // if (lastMove.minuteLeft < lastMove.minuteLeft2) {
              //   status = 'Game draw, but user ' + this.myUserName + ' lost the game as per timing rules'
              // } else {
              //   status = 'Game draw, but user ' + this.oppoUserName + ' lost the game as per timing rules'
              // }
            }
            this.setMessage(status)
            return
          }
        }
        let position = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
        if (this.matchData.status === 'STARTED' && lastMove != null) {
          this.game.load_pgn(lastMove.pgn)
          let tFen = lastMove.fen
          let turn = tFen.charAt(tFen.indexOf(' ') + 1)
          position = lastMove.fen
          if (turn === 'b') {
            dragColor = 'black'
          } else {
            dragColor = 'white'
          }
          if (this.$props.timers) {
            console.log(dragColor, 'Lost the game due to time')
            this.board.set({
              fen: this.game.fen()
            })
            return
          }
          if (this.myUserName === lastMove.userName1) {
            this.$emit('newdata', ['timer', false, 1, 1, true, this.myUserName, lastMove.minuteLeft, lastMove.minuteLeft2])
          } else {
            this.$emit('newdata', ['timer', true, 1, 1, false, this.oppoUserName, lastMove.minuteLeft2, lastMove.minuteLeft1])
          }
        } else {
          dragColor = 'white'
          position = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
          this.game.load(position)
          this.$emit('newdata', ['timer', false, 1, 1, false, this.myUserName, 3 * 60 * 1000, 3 * 60 * 1000])
        }
        if (this.matchData.color === dragColor) {
          if (lastMove === null || lastMove === undefined) {
            this.$emit('newdata', ['timer', false, 1, 1, false, this.myUserName, 3 * 60 * 1000, 3 * 60 * 1000])
          } else {
            this.$emit('newdata', ['timer', true, 1, 1, false, this.myUserName, lastMove.minuteLeft, lastMove.minuteLeft2])
          }
          this.board.set({
            fen: position,
            turnColor: dragColor,
            orientation: this.matchData.color,
            movable: {
              color: dragColor,
              dests: this.possibleMoves(),
              events: {
                after: this.userPlay()
              }
            }
          })
        } else {
          if (lastMove === null || lastMove === undefined) {
            console.log('last move is null')
            // this.$emit('newdata', ['timer', false, 1, 1, false, this.myUserName, null, null])
          } else {
            // this.$emit('newdata', ['timer', false, 1, 1, true, this.myUserName, lastMove.minuteLeft, lastMove.minuteLeft2])
          }
          this.board.set({
            fen: position,
            orientation: this.matchData.color,
            movable: {
              dests: {}
            }
          })
        }
        var node = document.createElement('DIV')
        let moveColor = dragColor
        if (this.game.in_checkmate()) {
          status = 'Game over, ' + moveColor + ' is in checkmate.'
          let textnode = document.createTextNode(status)
          node.appendChild(textnode)
          document.getElementById('app').appendChild(node)
        } else if (this.game.in_draw()) {
          status = 'Game over, drawn position'
          let textnode = document.createTextNode(status)
          node.appendChild(textnode)
          document.getElementById('app').appendChild(node)
        } else {
          status = moveColor + ' to move'
        }
        this.setMessage(status)
        if (lastMove === null || lastMove === undefined) {
          // this.$emit('loadPage', ['loaded', ''])
        } else {
          // this.$emit('loadPage', ['loaded', lastMove.pgn])
        }
      }).catch(err => { this.doSomethingElseFoeError(err.response) })
    }
    this.socket.on('error', data => {
      window.location.reload()
    })
    this.socket.on(this.$route.params.id, data => {
      if (data.error === true || data.gameOver === true || data.isReload === true) {
        window.location.reload()
      }
      if (data.fen !== this.game.fen()) {
        if (data.gameOver) {
          this.board.set({
            fen: data.fen
          })
          return
        }
        let tFen = data.fen
        let turn = tFen.charAt(tFen.indexOf(' ') + 1)
        this.game.move({from: data.source, to: data.target, promotion: this.promoteTo}) // promote to queen for simplicity
        if (turn === 'b') {
          dragColor = 'black'
        } else {
          dragColor = 'white'
        }
        this.board.set({
          fen: data.fen,
          turnColor: dragColor,
          movable: {
            color: dragColor,
            dests: this.possibleMoves(),
            events: {
              after: this.userPlay()
            }
          }
        })
        let moveColor = dragColor
        if (this.game.in_checkmate()) {
          status = 'Game over, ' + moveColor + ' is in checkmate.'
          this.setMessage(status)
          this.$emit('newdata', [this.matchData.color, false, 1, 1, false])
        } else if (this.game.in_draw() || data.isDraw) {
          status = 'Game over, drawn position'
          this.setMessage(status)
          this.$emit('newdata', [this.matchData.color, false, 1, 1, false])
        } else {
          status = moveColor + ' to move'
          if (data.userName1 !== null && this.myUserName === data.userName1) {
            this.$emit('newdata', ['timer', true, 1, 1, false, data.userName1, data.millitTimeForUserName_1, data.millitTimeForUserName_2])
          } else {
            this.$emit('newdata', ['timer', true, 1, 1, false, data.userName1, data.millitTimeForUserName_2, data.millitTimeForUserName_1])
          }
          this.setMessage(status)
        }
        this.$emit('loadPage', ['loaded', this.game.pgn()])
      }
    })
  }
}
</script>
