import state from './dices-default-state.js'
import { SIDES_TYPES } from '../constants/index.js'

const STORE = 'dices'
export const DICES_STORE = {
  STORE,
  MUTATIONS : {
    UPSERT: `${STORE}_new`,
    DELETE: `${STORE}_delete`,
    ADD_SIDE: `${STORE}_add_side`,
    REMOVE_SIDE: `${STORE}_remove_side`,
  },
  GETTERS: {
    PROCESSED: `get_processed_${STORE}`
  }
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

const SIZES_NEED_PROCCESING = {
  [SIDES_TYPES.NUMBER_INTERVAL] : true
}

const processDice = (dice) => {
  const { sides, ...restDice } = dice

  restDice.sides = sides.reduce(
    (result, side) => {
      if (!SIZES_NEED_PROCCESING[side.type]) {
        result.push(side)
        return result
      }
      if (side.type === SIDES_TYPES.NUMBER_INTERVAL) {
        let [lowerBound, upperBound] = side.content.split('-')
        for (lowerBound; lowerBound <= upperBound; lowerBound++) {
          result.push({content: lowerBound, type: SIDES_TYPES.NUMBER})
        }
      }

      return result
    },
    []
  )

  return restDice

}

const getters = {
  [DICES_STORE.GETTERS.PROCESSED]: state => Object.keys(state).reduce(
    (result, diceSlug) => {
      result[diceSlug] = processDice(state[diceSlug])
      return result
    },
    {}
  )
}


export default {
  state,
  mutations,
  getters,
}