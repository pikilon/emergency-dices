import state from './games-sets-default-state.js'
const STORE = 'games_sets'
export const GAMES_SETS_STORE = {
  STORE,
  MUTATIONS : {
    UPSERT: `${STORE}_new`,
    DELETE: `${STORE}_delete`,
    ADD_DICE: `${STORE}_add_dice`,
    REMOVE_DICE: `${STORE}_remove_dice`,
  },
  GETTERS: {
    ARRAY: `get_${STORE}_array`,
  }
}

const mutations = {
  [GAMES_SETS_STORE.MUTATIONS.UPSERT]: function(state, newSet) {
    Vue.set(state, newSet.slug, newSet)
  },
  [GAMES_SETS_STORE.MUTATIONS.DELETE]: function(state, setSlug) {
    Vue.delete(state, setSlug)
  },
  [GAMES_SETS_STORE.MUTATIONS.ADD_DICE]: function(state, {setSlug, diceSlug}) {
    state[setSlug].dices.push(diceSlug)
  },
  [GAMES_SETS_STORE.MUTATIONS.REMOVE_DICE]: function(state, {setSlug, diceSlug}) {
    state[setSlug].dices.splice(diceSlug, 1)
  },
}

const getters = {
  [GAMES_SETS_STORE.GETTERS.ARRAY]: state => Object.values(state),
}

export default {
  state,
  mutations,
  getters,
}