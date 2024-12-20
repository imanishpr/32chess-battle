import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    eventList: {},
    eventList1: {}
  },
  mutations: {
    saveEventList: (state, eventList) => {
      state.eventList = eventList
    },
    saveEventList1: (state, eventList1) => {
      state.eventList1 = eventList1
    },
    savePhone: (state, phone) => {
      state.phone = phone
    }
  }
})
