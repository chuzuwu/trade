import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  direction: 'forward',
  pageTitle: ''
}
let store = new Vuex.Store({
  state,
  mutations: {
    updateDirection (state, payload) {
      console.log('store mutations updateDirection direction is =>', payload.direction)
      state.direction = payload.direction
    },
    updatePageTitle (state, payload) {
      console.log('store mutations updatePageTitle name is =>', payload.name)
      state.pageTitle = payload.name
    }
  }
});
