export const CSS_STORE = {
  MUTATIONS : {
    ADD: 'css_add',
    REMOVE: 'css_remove',
  },
  GETTERS: {
    ALL: 'css_all',
  },
}

const state = {}
const mutations = {
  [CSS_STORE.MUTATIONS.ADD]: function(state, event) {
    const {key, styleString} = event
    const entry = state[key]
    if (entry) {
      Vue.set(state, key, {...entry, counter: entry.counter + 1})
    } else {
      Vue.set(state, key,  { counter: 1, styleString })
    }
  },
  [CSS_STORE.MUTATIONS.REMOVE]: function(state, key) {
    const entry = state[key]
    if (!entry) return
    if (entry.counter <= 1) {
      Vue.delete(state, key)
    } else {
      Vue.set(state, key, {...entry, counter: entry.counter - 1})
    }
  }
}

const getters = {
  [CSS_STORE.GETTERS.ALL]: function(state) { return Object.values(state).map(({styleString}) => styleString).join('\n\n')}
}

export default {
  state,
  mutations,
  getters,
}