import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let cart = window.localStorage.getItem('cart')

export default new Vuex.Store({
  state: {
    cart: cart ? JSON.parse(cart) : []
  },
  getters: {
    cart: (state) => {
      return state.cart
    },
    total: (state) => {
      let total = 0
      state.cart.forEach((product) => {
        total += product.quantity * product.price
      })
      return total
    }
  },
  mutations: {
    addToCart(state, product) {
      let found = state.cart.find(item => item.id == product.id)
      if(found) {
        found.quantity++
      } else {
        state.cart.push(product) 
      }
      this.commit('saveData')
    },
    saveData(state) {
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeItem(state, product) {
      let index = state.cart.indexOf(product)

      state.cart.splice(index, 1)

      this.commit('saveData')
    }
  },
  actions: {

  }
})
