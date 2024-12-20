import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/Home/Home'
import SignUp from '@/components/signup/SignUp'
import EventDescription from '@/components/Event/EventDescription'
import BookEvent from '@/components/Event/BookEvent'
import MyProfile from '@/components/Profile/MyProfile'
import Thankyou from '@/components/Thankyou/Thankyou'
import Fixture from '@/components/fixture/Fixture'
import MainChessBoard from '@/components/Chess/MainChessBoard'
import PageNotFound from '@/components/notFound/PageNotFound'
import MyMatch from '@/components/MyMatch/MyMatch'
import TnC from '@/components/tnc/TnC'
import ContactUs from '@/components/Contact/ContactUs'
import ResetPasscode from '@/components/ResetPasscode/ResetPasscode'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/my-profile',
      component: MyProfile,
      name: 'MyProfile',
      props: true
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      name: 'Home'
    },
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/event-description/:id',
      component: EventDescription,
      name: 'EventDescription',
      props: true
    },
    {
      path: '/confirm-participation/:id',
      component: BookEvent,
      name: 'BookEvent',
      props: true
    },
    {
      path: '/thankyou/*',
      component: Thankyou,
      name: 'ThankYouPage',
      props: true
    },
    {
      path: '/fixture/:id',
      component: Fixture,
      name: 'Fixture',
      props: true
    },
    {
      path: '/fixture',
      beforeEnter: (to, from, next) => {
        const id = to.query.id
        if (id) {
          // Redirect to the new format without the query parameter
          next(`/fixture/${id}`)
        } else {
          next('/') // Redirect to home or another route if no ID is present
        }
      }
    },
    {
      path: '/mymatch/:id',
      component: MainChessBoard,
      name: 'POCChessBoard',
      props: false
    },
    {
      path: '/mymatch',
      beforeEnter: (to, from, next) => {
        const id = to.query.id
        if (id) {
          // Redirect to the new format without the query parameter
          next(`/mymatch/${id}`)
        } else {
          next('/') // Redirect to home or another route if no ID is present
        }
      }
    },
    {
      path: '/joined-match',
      component: MyMatch,
      name: 'MyMatch',
      props: false
    },
    {
      path: '/tnc',
      component: TnC,
      name: 'TnC',
      props: false
    },
    {
      path: '/contact',
      component: ContactUs,
      name: 'ContactUs',
      props: false
    },
    {
      path: '/reset-passcode',
      component: ResetPasscode,
      name: 'ResetPasscode',
      props: false
    },
    {
      path: '*',
      component: PageNotFound,
      name: 'PageNotFound',
      props: false
    }
  ]
})
