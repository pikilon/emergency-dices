import state from './dices-default-state.js'
const STORE = 'dices'
export const DICES_STORE = {
  STORE,
  MUTATIONS : {
    UPSERT: `${STORE}_new`,
    DELETE: `${STORE}_delete`,
    ADD_SIDE: `${STORE}_add_side`,
    REMOVE_SIDE: `${STORE}_remove_side`,
  },
}

const mutations = {
  [DICES_STORE.MUTATIONS.UPSERT]: function(state, newSet) {
    Vue.set(state, newSet.slug, newSet)
  },
  [DICES_STORE.MUTATIONS.DELETE]: function(state, diceSlug) {
    Vue.delete(state, diceSlug)
  },
  [DICES_STORE.MUTATIONS.ADD_SIDE]: function(state, {diceSlug, side}) {
    state[diceSlug].sides.push(side)
  },
  [DICES_STORE.MUTATIONS.REMOVE_SIDE]: function(state, {diceSlug, sideIndex}) {
    state[diceSlug].sides.splice(sideIndex, 1)
  },
}
/*
const getters = {
  [SETS_STORE.GETTERS.ONE]: state => slug => state[slug],
  [SETS_STORE.GETTERS.ONE_TITLE]: state => slug => state[slug] ? state[slug].title : false,
  [SETS_STORE.GETTERS.LINKS]: state => Object.values(state),
  [SETS_STORE.GETTERS.RANDOM_QUESTIONS]: state => Object.keys(state).reduce(
    (result, collectionKey) => {
      const collection = state[collectionKey]
      result[collectionKey] = {...collection, questions: _.shuffle(collection.questions)}
      return result
    },
    {}
  )
}
*/


export default {
  state,
  mutations,
  // getters,
}